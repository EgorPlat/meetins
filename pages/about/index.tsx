import { FaGithub, FaTelegram } from 'react-icons/fa6';
import s from './index.module.scss';
import { BiLogoGmail } from 'react-icons/bi';
import Link from 'next/link';

export default function About() {
    return (
        <div className={s.about}>
            <div className={s.aboutBlock}>
                <div className={s.aboutBlockImage}>
                    <img className={s.aboutBlockImageContent} src="/images/social_1.jpg"></img>
                </div>
                <div className={s.aboutBlockText}>
                    <div className={s.aboutBlockTextParagraph}>
                        Социальные сети по интересам - это приложения нацеленные на упрощение
                        взаимодействия между различными людьми, которые могут находиться далеко друг от друга,
                        но иметь общие интересы и желание развиваться в какой-либо области.
                    </div>
                    <div className={s.aboutBlockTextParagraph}>
                        Meetins - социальная сеть по интересам, которая может помочь людям найти себе сподвижников
                        в определенном деле, с целью совместного развития и общения. Здесь, пользователь может настроить
                        свой профиль, выбрать интересующие его сферы и контент на сайте будет подстраиваться в зависимости от
                        предпочтений и выбранных настроек пользователя.
                    </div>
                </div>
            </div>
            <div className={s.contactsBlock}>
                <div className={s.contactsBlockTitle}>
                    Связь с разработчиком (контакты)
                </div>
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
            </div>
        </div>
    )
}