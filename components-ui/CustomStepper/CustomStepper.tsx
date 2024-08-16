import { useEffect, useState } from 'react';
import s from './CustomStepper.module.scss';

interface IStep { title: string, component: any, props?: any };
interface ICustomStepperProps {
    steps: IStep[],
    center?: boolean
};

export default function CustomStepper({ steps, center }: ICustomStepperProps) {

    const [activeStep, setActiveStep] = useState<IStep>(steps[0]);
    const { component: CustomComponent } = activeStep;
    const { props: CustomComponentProps } = activeStep;

    useEffect(() => {
        steps.map(el => {
            if (el.title === activeStep.title) {
                setActiveStep(el);
                return;
            }
        })
    }, [steps]);

    return (
        <div className={s.customStepper}>
            <div className={s.steps} style={center ? { justifyContent: "center" } : { justifyContent: "left" }}>
                {
                    steps.map(step => (
                        <div
                            key={step.title}
                            className={step.title === activeStep?.title ? s.activeStep : s.commonStep}
                            onClick={() => setActiveStep(step)}
                        >
                            {step.title}
                        </div>
                    ))
                }
            </div>
            <div className={s.activeStepContent}>
                {
                    !CustomComponentProps ? <CustomComponent /> : <CustomComponent {...CustomComponentProps} />
                }
            </div>
        </div>
    )
}