import { ReactNode, useEffect, useState } from 'react';
import s from './CustomStepper.module.scss';

interface IStep { title: string, component: ReactNode };
interface ICustomStepperProps {
    steps: IStep[]
};

export default function CustomStepper({ steps }: ICustomStepperProps) {

    const [activeStep, setActiveStep] = useState<IStep>();

    useEffect(() => {
        setActiveStep(steps[0]);
    }, []);

    return (
        <div className={s.customStepper}>
            <div className={s.steps}>
                {
                    steps.map(step => (
                        <div 
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