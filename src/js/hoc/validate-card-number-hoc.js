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

		validationOnKeyUp = e => {
			this.setState({
				error: {}
			});
		}

		validationOnBlur = (e, cardType, cardLength) => {
			const props = this.props;
			const errMsg = this.cardNumber(e.target.value, cardType, cardLength);

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

export default ValidateCardNumberHOC;
