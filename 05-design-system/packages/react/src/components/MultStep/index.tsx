import { Label, MultStepsContainer, Step, Steps } from './styles'

export interface MultStepProps {
  size: number
  currentStep?: number
}

export function MultStep({ size, currentStep = 1 }: MultStepProps) {
  return (
    <MultStepsContainer>
      <Label>
        Passo {currentStep} de {size}
      </Label>

      <Steps css={{ '--steps-size': size }}>
        {Array.from({ length: size }, (_, i) => i + 1).map((step) => {
          return <Step key={step} active={currentStep >= step} />
        })}
      </Steps>
    </MultStepsContainer>
  )
}

MultStep.displayName = 'MultStep'
