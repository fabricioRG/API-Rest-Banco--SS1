DELIMITER //

CREATE FUNCTION UPDATE_BANK_ACCOUNT_TYPE(idAccount INT, newType VARCHAR(25))
	RETURNS INT
BEGIN

	DECLARE actualType VARCHAR(25);
	DECLARE actualAmount DOUBLE;
	DECLARE newAmount DOUBLE;
	
	SELECT BANK_ACCOUNT.balance, BANK_ACCOUNT.accountType
	INTO actualAmount, actualType
	FROM BANK_ACCOUNT
	WHERE BANK_ACCOUNT.id = idAccount;

	SET newAmount = actualAmount;

	IF actualType = 'PREMIUM' THEN
		SET newAmount = actualAmount * 7.5;
	ELSEIF actualType = 'PLUS' THEN
		SET newAmount = actualAmount * 10;
	END IF;

	IF newType = 'PREMIUM' THEN
		SET newAmount = newAmount / 7.5;
	ELSEIF newType = 'PLUS' THEN
		SET newAmount = newAmount / 10;
	END IF;

	UPDATE BANK_ACCOUNT
	SET BANK_ACCOUNT.accountType = newType, BANK_ACCOUNT.balance = newAmount
	WHERE id = idAccount;

	RETURN '1';
END //

