import {
  Text,
  Input,
  Card,
  Badge,
  Row,
  useTheme,
  Fieldset,
  useCurrentState,
  Button
} from '@zeit-ui/react'
import { Percent, DollarSign } from '@zeit-ui/react-icons'
import Head from 'next/head'

export default function Home() {
  const theme = useTheme()
  let [price, setPrice] = useCurrentState(0)
  let [discount, setDiscount] = useCurrentState(0)
  let [minPrice, setMinPrice] = useCurrentState(0)
  let [maxDiscount, setMaxDiscount] = useCurrentState(0)
  let [finalPrice, setFinal] = useCurrentState(0)

  let handleCalc = () => {
    let cashBack =  (price * discount) / 100
    if(minPrice > 0 && price < minPrice){
      setFinal(price)
    } else if(maxDiscount > 0 && cashBack > maxDiscount) {
      setFinal(price - maxDiscount)
    } else {
      setFinal(price - cashBack)
    }
  }
  return (
    <>
      <Head>
        <title>CashPer - Cashback Calculator</title>
        <meta property="og:title" content="CashPer - Cashback Calculator" key="title" />
        <meta property="og:description" content="Calculate your cashback easily." />
        <meta property="og:image" content="/og.png" />
      </Head>
      <Row style={{ marginBottom: '10px' }} justify="space-around">
        <Text b h2>
          <span style={{color: 'orange'}}>Cash</span>Per
        </Text>
      </Row>
      <Row justify="space-around" style={{ marginBottom: '25px' }}>
        <Card shadow width="75" type="dark">
          <Text b h2>
            <Badge style={{ backgroundColor: theme.palette.violet }}>
              Bayar
            </Badge>{' '}
            :{' '}
            {finalPrice == 0 ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : finalPrice.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
        </Card>
      </Row>
      <Row justify="space-around">
        <Fieldset.Group value="basic">
          <Fieldset label="basic">
            <Row justify="space-between" style={{
              marginBottom: '9px'
            }}>
              <Button size="small" shadow type="warning" onClick={handleCalc}><Text b>Calculate</Text></Button>
            </Row>
            <Row justify="space-around">
              <Card width="75" shadow>
                <Text b h4>
                  <Badge style={{ backgroundColor: theme.palette.successDark }}>
                    Base Price
                  </Badge>{' '}
                </Text>
                <Input
                  name="price"
                  type="number"
                  size="large"
                  status="secondary"
                  onChange={e => setPrice(e.target.value)}
                  icon={<DollarSign />}
                />
                <Text b h4>
                  <Badge style={{ backgroundColor: theme.palette.cyanDark }}>
                    Discount
                  </Badge>
                </Text>
                <Input
                  name="discount"
                  type="number"
                  onChange={e => setDiscount(e.target.value)}
                  size="large"
                  status="secondary"
                  iconRight={<Percent />}
                />
              </Card>
            </Row>
          </Fieldset>
          <Fieldset label="optional">
            <Row justify="space-around">
              <Card width="75" shadow>
                <Text b h4>
                  <Badge style={{ backgroundColor: theme.palette.successDark }}>
                    Mininum Price
                  </Badge>{' '}
                </Text>
                <Input
                  name="minPrice"
                  type="number"
                  size="large"
                  status="secondary"
                  onChange={e => setMinPrice(e.target.value)}
                  icon={<DollarSign />}
                />
                <Text b h4>
                  <Badge style={{ backgroundColor: theme.palette.cyanDark }}>
                    Maximum Cashback
                  </Badge>
                </Text>
                <Input
                  name="maxDiscount"
                  type="number"
                  onChange={e => setMaxDiscount(e.target.value)}
                  size="large"
                  status="secondary"
                  icon={<DollarSign />}
                />
              </Card>
            </Row>
          </Fieldset>
        </Fieldset.Group>
      </Row>
    </>
  )
}