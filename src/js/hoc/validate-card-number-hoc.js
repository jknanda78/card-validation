import { h, Component } from 'preact';

const ValidateCardNumberHOC = WrappedComponent => {
	class HOC extends Component {
		cardNumber = (inputVal, cardType, cardLen) => {
			let errKey = null;

			if (inputVal) {
				if (inputVal.replace(/\s/g, '').length !== cardLen) {
					errKey = 'cardNumber.length.mismatch';
				}
			}

			return errKey;
		}

		onBlurHandler = e => {
			const props = this.props;
			const errMsg = this.cardNumber(e.target.value, this.state.cardType, this.state.cardLength);

			if (errMsg) {
				this.setState({
					error: {
						[props.name]: errMsg
					}
				});
			}
		}

		constructor(props) {
			super(props);

			this.onBlurHandler = this.onBlurHandler.bind(this);
		}

		render() {
			return (
				<WrappedComponent {...this.props} {...this.state} onBlurHandler={this.onBlurHandler} />
			);
		}
	}

	HOC.displayName = 'Validate Card Number';
	return HOC;
};

export default ValidateCardNumberHOC;
