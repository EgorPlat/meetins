import FormContainer from '../../../global/components/FormContainer/FormContainer';
import s from './GroupCreateTalk.module.scss';

export default function GroupCreateTalk() {
    return (
        <FormContainer>
            <form>
                <label htmlFor='title'>Тема обсуждения</label>
                <input id="title" placeholder='О чем будете говорить?' />
            </form>
        </FormContainer>
    )
}