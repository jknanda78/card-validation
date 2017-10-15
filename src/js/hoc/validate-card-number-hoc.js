import { h, Component } from 'preact';

const validateCardNumberHOC = WrappedComponent => {
	class HOC extends Component {
		getCardLenth = cardFirstDigit => {
			const fistDigit = parseInt(cardFirstDigit, 10);
			let cardLength;

			switch (fistDigit) {
				case 3:
					cardLength = 15;
					break;
				case 4:
				case 5:
				case 6:
					cardLength = 16;
					break;
				default:
					cardLength = 0;
					break;
			}

			return cardLength;
		}

		cardNumber = (inputVal, cardLen) => {
			let errKey = null;

			if (inputVal) {
				if (!cardLen) {
					cardLen = this.getCardLenth(inputVal.charAt(0));
				}

				if (inputVal.replace(/\s/g, '').length !== cardLen) {
					errKey = 'cardNumber.length.mismatch';
				}
			}

			return errKey;
		}

		validationOnKeyUp = e => {
			this.setState({
				error: {}
			});
		}

		validationOnBlur = (e, cardLength) => {
			const props = this.props;
			const errMsg = this.cardNumber(e.target.value, cardLength);

			if (errMsg) {
				this.setState({
					error: {
						[props.name]: errMsg
					}
				});
			}
			else {
				this.setState({
					error: {}
				});
			}
		}

		constructor(props) {
			super(props);

			this.validationOnBlur = this.validationOnBlur.bind(this);
			this.validationOnKeyUp = this.validationOnKeyUp.bind(this);
		}

		render() {
			return (
				<WrappedComponent {...this.props} {...this.state} validationOnBlur={this.validationOnBlur} validationOnKeyUp={this.validationOnKeyUp} />
			);
		}
	}

	HOC.displayName = 'Validate Card Number';
	return HOC;
};

export default validateCardNumberHOC;
