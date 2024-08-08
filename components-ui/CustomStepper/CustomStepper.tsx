import { ReactNode, useEffect, useState } from 'react';
import s from './CustomStepper.module.scss';

interface IStep { title: string, component: ReactNode };
interface ICustomStepperProps {
    steps: IStep[]
};

export default function CustomStepper({ steps }: ICustomStepperProps) {

    const [activeStep, setActiveStep] = useState<IStep>(steps[0]);

    useEffect(() => {
        setActiveStep(steps[0]);
    }, [steps]);

    return (
        <div className={s.customStepper}>
            <div className={s.steps}>
                {
                    steps.map(step => (
                        <div
                            key={step.title} 
                            className={ step.title === activeStep?.title ? s.activeStep : s.commonStep }
                            onClick={() => setActiveStep(step)}
                        >
                            {step.title}
                        </div>
                    ))
                }
            </div>
            <div className={s.activeStepContent}>
                {activeStep && activeStep.component}
            </div>
        </div>
    )
}