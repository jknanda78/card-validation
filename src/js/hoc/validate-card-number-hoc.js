import { h, Component } from 'preact';

const validateCardNumberHOC = WrappedComponent => {
	class HOC extends Component {
		getCardLenth = cardFirstDigit => {
			const fistDigit = parseInt(cardFirstDigit, 10);

			switch (fistDigit) {
				case 3:
					return {
						type: 'American Express',
						length: 15
					};
				case 4:
					return {
						type: 'VISA',
						length: 16
					};
				case 5:
					return {
						type: 'MasterCard',
						length: 16
					};
				case 6:
					return {
						type: 'Discover',
						length: 16
					};
				default:
					return {
						type: '',
						length: 0
					};
			}
		}

		cardNumber = (inputVal, cardLen) => {
			let errKey = null;

			if (inputVal) {
				if (!cardLen) {
					const card = this.getCardLenth(inputVal.charAt(0));

					cardLen = card.length;
					this.setState({
						cardType: card.type
					});
				}

				if (inputVal.replace(/\s/g, '').length !== cardLen) {
					errKey = 'cardNumber.length.mismatch';
				}
			}

			return errKey;
		}

		validationOnKeyUp = (e) => {
			console.log('validateCardNumberHOC::onKeyUp'); //eslint-disable-line
			const inputVal = e.target.value;
			const card = this.getCardLenth(inputVal.charAt(0));

			this.setState({
				cardType: card.type,
				cardLength: card.length,
				error: {}
			});

			if (this.props.onKeyUp) {
				this.props.onKeyUp(e, this.state.cardType);
			}
		}

		validationOnBlur = (e) => {
			console.log('validateCardNumberHOC::onBlur');
			const props = this.props;
			const errMsg = this.cardNumber(e.target.value, this.state.cardLength);

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

			if (this.props.onBlur) {
				this.props.onBlur(e);
			}
		}

		render() {
			return (
				<WrappedComponent
					{...this.props}
					{...this.state}
					onBlur={this.validationOnBlur}
					onKeyUp={this.validationOnKeyUp}
				/>
			);
		}
	}

	HOC.displayName = 'Validate Card Number';
	return HOC;
};

export default validateCardNumberHOC;
