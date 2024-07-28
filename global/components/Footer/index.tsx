import s from './footer.module.scss';

export default function Footer(): JSX.Element {
	return (
		<div className={s.footer}>1</div>
		/*<footer
			style={{ backgroundColor: props.backgroundColor }}
			className={`${s.footer} ${s.container}`}>
			<div className={'_container'}>
				<div className={s.footerBody}>
					<a
						href='#'
						style={{ color: props.textColor }}
						className={s.footerLink}>
						Разработчикам
					</a>
					<a href='#' className={s.footerLinkLogo}>
						<Image
							width={22}
							height={22}
							src={companyLogo}
							alt='logo'
						/>

						<p
							style={{ color: props.textColor }}
							className={s.footerLabel}>
							Meetins
						</p>
					</a>
					<div className={s.footerSociums}>
						<a href='#' className={s.footerLinkSocium}>
							<VkIcon color={props.textColor} />
						</a>
						<a href='#' className={s.footerLinkSocium}>
							<FacebookIcon color={props.textColor} />
						</a>
						<a href='#' className={s.footerLinkSocium}>
							<YoutubeIcon color={props.textColor} />
						</a>
					</div>
				</div>
			</div>
		</footer>*/
	)
}
