window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError= document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).name = name.value;;
            textError.textContent= "";
        } catch (e) {
            textError.textContent=e;
        }
    });

   });

const save = () => {
    try {
        let addressBookData = createAddressBookData();
        createAndUpdateStorage(addressBookData);
        alert(addressBookData.toString());
    }catch (e) {
        return;
    }
}

function createAndUpdateStorage(addressBookData){
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if (addressBookList != undefined){
        addressBookList.push(addressBookData);
    }else {
        addressBookList = [addressBookData];
    }
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList))
}

const createAddressBookData = () => {
    let addressBookData = new AddressBookData();
    try{
        addressBookData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    
    addressBookData.phone = getInputValueById('#phone');
    addressBookData.address = getInputValueById('#address');
    addressBookData.state = getInputValueById('#state');
    addressBookData.city=getInputValueById('#city');
    addressBookData.zip=getInputValueById('#zip');
    return addressBookData;
}


// function getSelectedValues(propertyValue) {
//     let allItems = document.querySelectorAll(propertyValue);
//     let selItems = [];
//     allItems.forEach(item => {
//         if (item.checked)
//             selItems.push(item.value);
//     });
//     return selItems;
// }

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const resetForm = () => {
    setValue('#name','');
    setValue('#phone','');
    setValue('#address','');
    setValue('#state','Assam');
    setValue('#city','Agra');
    setValue('#zip','');
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item=> {
        item.checked=false;
    });
}

const setTextValue = (id,value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}


class AddressBookData{

    get id() {return this._id;}
    set id(id){
        this._id=id;
    }

    get name() {return this._name;}
    set name(name){
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$')
    if(nameRegex.test(name))
    this._name=name;
    else throw "Name is Incorrect!";
    }

    
    get state(){return this._state;}
    set state(state){
    this._state=state;
    }

    get city(){return this._city}
    set city(city){
    this._city=city;
    }

    get phone(){return this._phone;}
    set phone(phone){
    this._phone=phone;
    }

    get address(){return this._address;}
    set address(address){
    this._address=address;
    }

    get zip(){return this._zip;}
    set zip(zip){
    this._zip=zip;
    }

    toString() {
    return ("id=" + this.id + ", name='" + this.name + ", phone=" + this.phone + ", address=" + 
    this.address + ", state=" + this.state + ", city=" + this._city + ", Zip Code=" + this.zip);
    }
}