export default function Custom404() {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            height: "70vh",
            alignItems: "center"
        }}>
            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                alignItems: "center",
                justifyItems: "center",
                rowGap: "10px"
            }}>
                <img
                    width="50px"
                    height="50px"
                    src="images/logo.svg"
                ></img>
                Ошибка, страница не найдена.
                Чтобы продолжить работу с сервисом нажмите на Аватар в крайнем правом углу.
            </div>
        </div>
    )
}