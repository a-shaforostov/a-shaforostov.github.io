const Flipper = React.createClass({

    getInitialState() {
        return {
            flipped: false
        }
    },

    handleFlipCard() {
        this.setState({flipped: !this.state.flipped});
    },

    render() {

        return (

            <div className="container" onClick={this.handleFlipCard}>
                <div id="card" className={this.state.flipped && 'flipped'}>
                    <img className="front" src="duas_caras.jpg" alt="catminator" />
                    <div className="back"></div>
                </div>
            </div>
        )
    }

});

ReactDOM.render(
    <Flipper />,
    document.getElementById('root')
);