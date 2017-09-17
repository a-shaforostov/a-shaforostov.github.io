const article = {
    title: 'Lorem Ipsum',
    author: 'ru.lipsum.com',
    text: 'Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе. В результате он нашёл неоспоримый первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной Цицероном в 45 году н.э. Этот трактат по теории этики был очень популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32',
    likes: 121,
    comments: 34
};

const ArticleComponent = React.createClass({

    render() {
        const {title, author, text, likes, comments} = this.props.article;

        return (
            <article>
                <h1>{title}</h1>
                <span>by </span><span className="author">{author}</span>
                <p>{text}</p>
                <div className="state">
                    <span className="likes"><i className="fa fa-heart"></i> {likes}</span>
                    <span className="comments"><i className="fa fa-comment"></i> {comments}</span>
                </div>
            </article>
        )
    }

});

ReactDOM.render(
    <ArticleComponent article={article} />,
    document.getElementById('root')
);
