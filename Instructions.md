###################################
        compile
###################################


# build
truffle compile

# local
truffle migrate --network development

# deploy polygn
truffle migrate --network polygon

# deploy polygon
truffle migrate --network bsc

# deploy optimism
truffle migrate --network optimism


###################################
            Testes
###################################

# run test
truffle test

# run cluaido coin
truffle test test/CluaidoCoin.test.

# run CluaidoCollection
truffle test test/CluaidoCollection.test.js

# Grep "Coin"
truffle test --grep "Coin"


# npm truffle run coverage
npx truffle run coverage


###################################
            Verificar
###################################
# verificação do contracto na polygon
truffle run verify NomeDoContrato@Endereco --network polygon

# verificação do contracto na polygon
truffle run verify NomeDoContrato@Endereco --network optimism


