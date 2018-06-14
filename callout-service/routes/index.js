var uniqid = require('uniqid');
var express = require('express');
var router = express.Router();
var R = require('ramda');

let claims = [
];

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// claims

router.get('/api/claims', function(req, res, next) {
  res.json(claims);
});

router.post('/api/claims', function(req, res, next) {
  const newClaim = req.body;
  const createdClaim = Object.assign({}, newClaim, {id: uniqid()});

  claims.push(createdClaim);

  res.json(createdClaim);
});

router.delete('/api/claims/:id', function(req, res, next) {
  const cid = req.params.id;
  claims = claims.filter((c) => c.id !== cid);

  res.json({});
});


// callback
router.post('/callback', function(req, res, next) {
  const input = req.body;
  const tokens = R.compose(
    R.keys,
    R.pick(['id_token', 'access_token']),
  )(input.tokens || {});

  if (!tokens.length) {
    res.json({
      action: {
        type: 'DENY',
        log: {
          displayMessage: 'no token found in the input'
        }
      }
    })
  }

  if (!claims.length) {
    res.json({
      action: {
        type: 'DENY',
        log: {
          displayMessage: 'no claims have been created'
        }
      }
    })
  }

  const tokenScopes = R.compose(
    R.flatten,
    R.map(R.prop('scp')),
    R.values,
  )(input.tokens);

  const isRequestedClaim = (c) => {
    return R.contains(`${c.claimName}:${c.claimValue}`, tokenScopes);
  };

  const commandBase = {
    type: 'oidc:claims:patch',
    tokens,
    op: 'add',
  }
  const commands = claims
    .filter(isRequestedClaim)
    .map((c) => {
    return Object.assign({}, commandBase, {
      path: c.claimName,
      value: c.claimValue,
    });
  })

  if (!commands.length) {
    res.json({
      action: {
        type: 'DENY',
        log: {
          displayMessage: 'no claims found for passed in scopes'
        }
      }
    })
  }

  const resp = {
    action: {
      type: 'ALLOW',
      commands,
    }
  }
  res.json(resp);
});

module.exports = router;
