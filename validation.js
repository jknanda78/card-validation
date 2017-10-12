const Validation = {
	cardNumber: (inputVal, cardType, cardLen) => {
		let errKey = null;

		if (inputVal) {
			if (inputVal.replace(/\s/g, '').length !== cardLen) {
				errKey = 'cardNumber.length.mismatch';
			}
		}

		return errKey;
	}
};

export default Validation;
