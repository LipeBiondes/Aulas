import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { Container, Header } from '../styles'
import {
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInputs,
  IntervelItem,
} from './styles'
import { ArrowRight } from 'phosphor-react'

export default function TimeIntervals() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>
        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>
        <IntervalBox as="form">
          <IntervalContainer>
            <IntervelItem>
              <IntervalDay>
                <Checkbox />
                <Text>Segunda-Feira</Text>
              </IntervalDay>
              <IntervalInputs>
                <TextInput size="sm" type="time" step={60} />
                <TextInput size="sm" type="time" step={60} />
              </IntervalInputs>
            </IntervelItem>

            <IntervelItem>
              <IntervalDay>
                <Checkbox />
                <Text>Terça-Feira</Text>
              </IntervalDay>
              <IntervalInputs>
                <TextInput size="sm" type="time" step={60} />
                <TextInput size="sm" type="time" step={60} />
              </IntervalInputs>
            </IntervelItem>
          </IntervalContainer>

          <Button type="submit">
            Proximo passo <ArrowRight />
          </Button>
        </IntervalBox>
        <MultiStep size={4} currentStep={3} />
      </Header>
    </Container>
  )
}
