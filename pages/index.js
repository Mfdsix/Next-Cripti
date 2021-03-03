  import {
  Navbar, Nav, Container, Jumbotron, Button, Row, Col
  } from 'react-bootstrap'
  import 'bootstrap/dist/css/bootstrap.min.css'
  import axios from 'axios'

  function Index({ cryptos }){
  return(
  <div>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Cripti</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Container>
    </Navbar>

    <Jumbotron>
      <Container>
        <h1>Hello, devs!</h1>
        <p>Let's see how much cripto prices with <b>cripti</b></p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Container>
    </Jumbotron>

    <Container className={ 'mb-4' }>
      <Row>
        { cryptos.map((crypto) =>
        <Col sm={3} className={ 'p-1' } key={ crypto.coinId } style={{ alignSelf: 'stretch' }}>
        <div className={ 'bg-primary p-4 text-white text-center rounded mb-2' } style={{ height: '100%' }}>
          <h4>{ crypto.coinName }</h4>
          <p>{ crypto.kurs }</p>
        </div>
        </Col>
        )}
      </Row>
    </Container>
  </div>
  )
  }

  export async function getStaticProps(context){

  let coins = [
  'bitcoin',
  'ethereum',
  'binancecoin',
  'uniswap',
  'havven',
  ]
  let destination = 'idr'

  let cryptos = await loadPrices(coins, destination)
  return{
  props: {
  cryptos: cryptos
  },
  revalidate: 1
  }
  }

  async function loadPrices(coins, destination){
  let cryptos = [];

  let request = await
  axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(",")}&vs_currencies=${destination}`)
  let responses = request.data

  for(let key of Object.keys(responses)){
  cryptos.push({
  coinId: key,
  coinName: await loadCoin(key),
  kurs: responses[key]['idr']
  })
  }

  return cryptos
  }

  async function loadCoin(coindId){
  try{
  let request = await axios.get(`https://api.coingecko.com/api/v3/coins/${coindId}`)
  let response = request.data

  if(response){
  return response.name
  }else{
  return coindId
  }
  }catch(e){
  console.log(e)
  return coindId
  }
  }

  export default Index