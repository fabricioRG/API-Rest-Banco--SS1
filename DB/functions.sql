DELIMITER //

CREATE FUNCTION AUTO_CREATE_USER_ACCOUNT(name_user VARCHAR(30), userName_user VARCHAR(20), pin_user INT)
	RETURNS INT
BEGIN

	DECLARE last_insert INT;
	
	INSERT INTO USER_ACCOUNT (name,userName,pin)
	VALUES (name_user, userName_user, pin_user);

	SELECT LAST_INSERT_ID()
	INTO last_insert;

	RETURN last_insert;
END //

--SELECT AUTO_CREATE_USER_ACCOUNT('Werner Lopez','wernerLZ','123456789') as id;

DELIMITER //

CREATE FUNCTION DEFAULT_CREATE_BANK_ACCOUNT(idUserAccount INT, accountType VARCHAR(10), role VARCHAR(10))
	RETURNS INT
BEGIN

	DECLARE last_insert INT;
	
	INSERT INTO BANK_ACCOUNT(idUserAccount,accountType,role)
	VALUES (idUserAccount,accountType,role);

	SELECT LAST_INSERT_ID()
	INTO last_insert;

	RETURN last_insert;

END //

--SELECT DEFAULT_CREATE_BANK_ACCOUNT('200000','PREMIUM','CLIENT') as id;

DELIMITER //

CREATE FUNCTION ADD_BANK_MOVEMENT(idBankAccount INT, movementType VARCHAR(20), amount DOUBLE)
	RETURNS INT
BEGIN
	
	DECLARE result_movement INT DEFAULT 0;
	DECLARE actual_amount DOUBLE;
	DECLARE recived_amount DOUBLE;
	DECLARE actual_accountType VARCHAR(20);

	SET recived_amount = amount;
	
	SELECT BANK_ACCOUNT.balance, BANK_ACCOUNT.accountType
	INTO actual_amount, actual_accountType
	FROM BANK_ACCOUNT
	WHERE BANK_ACCOUNT.id = idBankAccount;

	IF actual_accountType = 'PREMIUM' THEN
		SET recived_amount = recived_amount / 7.5;
	ELSEIF actual_accountType = 'PLUS' THEN
		SET recived_amount = recived_amount / 10;
	END IF;

	IF movementType = 'RETIREMENT' THEN
		IF actual_amount < recived_amount THEN
			RETURN result_movement;
		END IF;
	END IF;

	INSERT INTO BANK_MOVEMENT(idBankAccount,movementType,amount)
	VALUES (idBankAccount,movementType,recived_amount);

	SET result_movement = 1;
	RETURN result_movement;

END //

--SELECT ADD_BANK_MOVEMENT('100008','ACCREDITATION','300');

DELIMITER //

CREATE TRIGGER ACTION_AFTER_BANK_MOVEMENT AFTER INSERT ON BANK_MOVEMENT
FOR EACH ROW
BEGIN
	DECLARE total_balance DOUBLE;
	DECLARE new_balance DOUBLE;
	
	SELECT BANK_ACCOUNT.balance
	INTO total_balance
	FROM BANK_ACCOUNT
	WHERE BANK_ACCOUNT.id = NEW.idBankAccount;

	IF NEW.movementType = 'ACCREDITATION' THEN
		SET new_balance = total_balance + NEW.amount;
		UPDATE BANK_ACCOUNT
		SET balance = new_balance
		WHERE BANK_ACCOUNT.id = NEW.idBankAccount;
	ELSEIF NEW.movementType = 'RETIREMENT' THEN
		SET new_balance = total_balance - NEW.amount;
		UPDATE BANK_ACCOUNT
		SET balance = new_balance
		WHERE BANK_ACCOUNT.id = NEW.idBankAccount;
	END IF;

END;//
