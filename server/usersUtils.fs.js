const fs = require('fs');

//Users Functions
    //Add new use
const addUser = ({ passportID, name, cash, credit, isActive }) => {
    const usersList = getUsersFromJSON();
    const duplicateCheck = usersList.find(user => user.passportID === passportID);
    if(duplicateCheck) { //if user already exists, return false, which means operation didn't happen
        return null;
    }
    else { //continue add operation
        const newUser = {
            passportID: passportID,
            name: name,
            cash: parseInt(cash),
            credit: parseInt(credit),
            isActive: isActive
        }
        usersList.push(newUser)
        fs.writeFileSync('users.json', JSON.stringify(usersList))
        return newUser; //return user created
    }
}

    //Get specific user
const getSpecificUser = (passportID) => {
    const usersList = getUsersFromJSON();
    const wantedUser = usersList.find(user => user.passportID === passportID);
    return wantedUser; //if exist, expect a user object, if not, expect undefined
}

    //Get all users
const getUsersFromJSON = () => {
    try {
        const fileBuffer = fs.readFileSync('users.json')
        const data = fileBuffer.toString();
        return JSON.parse(data);
    }
    catch (e) {
        return []
    }
}

    //Update user credit
const updateUserCredit = (passportID, creditAmountToUpdate) => {
    const usersList = getUsersFromJSON();
    console.log('passportID',passportID);
    const wantedUser = usersList.find(user => user.passportID === passportID);
    if(wantedUser && creditAmountToUpdate >= 0){ //if user exists, and credit amount is positive
        wantedUser.credit = creditAmountToUpdate;
        fs.writeFileSync('users.json', JSON.stringify(usersList))
        return true; //true means, user found and value updated
    }
    else { //doesn't exist, return false;
        return false;
    }
}

//Transactions Functions
    //Get all transactions
const getAllTransactionsFromJSON = () => {
    try {
        const fileBuffer = fs.readFileSync('transactions.json')
        const data = fileBuffer.toString();
        return JSON.parse(data);
    }
    catch (e) {
        return []
    }
}
    //Add new transaction
const addTransaction = ({transactionType, amount, receiver, sender}) => {
    amount = parseInt(amount);
    if(amount <= 0)
        return false;
    let newTransaction = null;
    const usersList = getUsersFromJSON();
    const transactionsList = getAllTransactionsFromJSON();

    const receiverObj = usersList.find(user => user.passportID === receiver);
    const senderObj = usersList.find(user => user.passportID === sender);
    if(transactionType === 'withdrawal') {
        if(receiverObj && receiverObj.isActive && ((receiverObj.cash + receiverObj.credit) >= amount)) {
            newTransaction = {
                transactionType: transactionType,
                amount: amount,
                receiver: receiver,
                sender: receiver,
                id: transactionsList.length == 0 ? 0 : transactionsList[transactionsList.length - 1].id + 1
            }
            receiverObj.cash -= amount;
        }
        else return false;
    }
    else {
        if(transactionType === 'transferBetweenAccounts') {
            if(receiverObj && senderObj && receiverObj.isActive && senderObj.isActive && ((senderObj.cash + senderObj.credit) >= amount)) {
                newTransaction = {
                    transactionType: transactionType,
                    amount: amount,
                    receiver: receiver,
                    sender: sender,
                    id: transactionsList.length == 0 ? 0 : transactionsList[transactionsList.length - 1].id + 1
                }
                receiverObj.cash += amount;
                senderObj.cash -= amount;
            }
            else return false; //operation cannot happen
        }
        else { // type = deposit
            if(receiverObj && senderObj && receiverObj.isActive && senderObj.isActive) {
                newTransaction = {
                    transactionType: transactionType,
                    amount: amount,
                    receiver: receiver,
                    sender: sender,
                    id: transactionsList.length == 0 ? 0 : transactionsList[transactionsList.length - 1].id + 1
                }
                receiverObj.cash += amount;
            }
            else return false; //operation cannot happen
        }
    }
    if(newTransaction) {
        transactionsList.push(newTransaction)
        fs.writeFileSync('transactions.json', JSON.stringify(transactionsList))
        fs.writeFileSync('users.json', JSON.stringify(usersList))
        return newTransaction;
    }
    return false;
}
module.exports = {
    /* the user functions */
    addUser: addUser,
    getUsersFromJSON: getUsersFromJSON,
    getSpecificUser: getSpecificUser,
    updateUserCredit, updateUserCredit,
    
    /* the transactions functions  */
    getAllTransactionsFromJSON: getAllTransactionsFromJSON,
    addTransaction: addTransaction
}