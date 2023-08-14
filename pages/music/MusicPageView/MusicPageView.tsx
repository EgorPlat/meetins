import { BsPlay } from 'react-icons/bs';
import s from './MusicPageView.module.scss';

export default function MusicPageView() {
    return (
        <div className={s.music}>
            <div className={s.musicSearch}>
                <input className={s.musicSearchInp} type='text' placeholder='Введите название музыкальной композиции' />
                <button className={s.musicSearchBtn} >Искать</button>
            </div>
            <div className={s.musicContent}>
                <div className={s.musicContentTitle}>Текущий плейлист</div>
                {
                    [1, 2, 3].map(el => (
                        <div className={s.musicContentElement} key={el}>
                            <div className={s.musicContentElementLogo}>
                                <img 
                                    src="https://i1.sndcdn.com/artworks-YnWJxJ5thP5j4i3Y-KdEiUg-t500x500.jpg"
                                    width="100%"
                                    height="100%"
                                />
                            </div>
                            <div className={s.musicContentElementInfo}>
                                <div className={s.musicContentElementInfoTitle}>
                                    Fireman <span style={{color: "gray"}}>(3: 45)</span> 
                                </div>
                                <div className={s.musicContentElementInfoAuthor}>
                                    Miyagi (feat with Эндшпиль)
                                </div>
                            </div>
                            <div className={s.musicContentElementInfoActions}>
                                <BsPlay fontSize={30}/>
                                <audio
                                    onFocus={(e) => console.log(e)}
                                    controls
                                    className={s.audio}
                                    src='/IGotLove.mp3'
                                >
                                </audio>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}