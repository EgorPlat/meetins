import { FaGithub, FaTelegram } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";
import Link from "next/link";
import CustomShowUpComponent from "../../../../shared/ui/CustomShowUpText/CustomShowUpComponent";
import s from "./AboutPageView.module.scss";

export default function AboutPageView() {
    return (
        <div className={s.about}>
            <div className={s.aboutBlock}>
                <div className={s.aboutBlockImage}>
                    <CustomShowUpComponent side='bottom' transitionType='ease-out'>
                        <img className={s.aboutBlockImageContent} src="/images/social_1.jpg"></img>
                    </CustomShowUpComponent>
                </div>
                <div className={s.aboutBlockText}>
                    <div className={s.aboutBlockTextParagraph}>
                        <CustomShowUpComponent side='left' transitionType='ease-out'>
                                Социальные сети по интересам - это приложения нацеленные на упрощение
                                взаимодействия между различными людьми, которые могут находиться далеко друг от друга,
                                но иметь общие интересы и желание развиваться в какой-либо области.
                        </CustomShowUpComponent>
                    </div>
                    <div className={s.aboutBlockTextParagraph}>
                        <CustomShowUpComponent side='right' transitionType='ease-out'>
                                Meetins - социальная сеть по интересам, которая может помочь людям найти себе сподвижников
                                в определенном деле, с целью совместного развития и общения. Здесь, пользователь может настроить
                                свой профиль, выбрать интересующие его сферы и контент на сайте будет подстраиваться в зависимости от
                                предпочтений и выбранных настроек пользователя.
                        </CustomShowUpComponent>
                    </div>
                </div>
            </div>
            <div className={s.contactsBlock}>
                <CustomShowUpComponent side='right' transitionType='ease-out'>
                    <div className={s.contactsBlockTitle}>
                            Связь с разработчиком (контакты)
                    </div>
                </CustomShowUpComponent>
                <CustomShowUpComponent side='top' transitionType='ease-out'>
                    <div className={s.contactsBlockLinks}>
                        <div className={s.contactsBlockLinksEach}>
                            <FaTelegram color='var(--default-color)' />
                            <Link 
                                href="https://t.me/jarv1s_fr" 
                                about='__blank'
                            >Telegram</Link>
                        </div>
                        <div className={s.contactsBlockLinksEach}>
                            <FaGithub color='orange' />
                            <Link 
                                href="https://github.com/EgorPlat" 
                                about='__blank'
                            >Github</Link>
                        </div>
                        <div className={s.contactsBlockLinksEach}>
                            <BiLogoGmail color='red' />
                            <Link 
                                href="https://github.com/EgorPlat" 
                                about='__blank'
                            >Email</Link>
                        </div>
                    </div>
                </CustomShowUpComponent>
            </div>
        </div>
    )
}