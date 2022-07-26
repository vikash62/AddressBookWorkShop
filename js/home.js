let addressBookList;
window.addEventListener('DOMContentLoaded', (event)=>{
	addressBookList = getAddressBookDataFromStorage();
	document.querySelector(".emp-count").textContent = addressBookList.length;
	createInnerHtml();
})

const getAddressBookDataFromStorage = () => {
	return localStorage.getItem('AddressBookList') ? JSON.parse(localStorage.getItem('AddressBookList')) : [];
}

const createInnerHtml = () => {
	if (addressBookList.length==0) return;
  const headerHtml = "<th>Fullname</th><th>Phone Number</th><th>Address</th><th>City</th>" +
	"<th>State</th><th>Zip Code</th><th></th>";
	let innerHtml = `${headerHtml}`;
	// let addressBookList = createAddressBookJSON();
for(const addressBookData of addressBookList){
	innerHtml =`${innerHtml}
                    <tr>
                        <td>${addressBookData._name}</td>
                        <td>${addressBookData._phone}</td>
                        <td>${addressBookData._address}</td>
                        <td>${addressBookData._state}</td>
                        <td>${addressBookData._city}</td>
                        <td>${addressBookData._zip}</td>
                        <td>
                            <img id="${addressBookData._name}" onclick="remove(this)" alt="delete"
                            src="../assets/delete-black-18dp.svg">
                            <img id="${addressBookData._name}" alt="edit" onclick="update(this)"
                            src="../assets/create-black-18dp.svg">
                        </td>
                    </tr>
										`;
}
										document.querySelector('#table-display').innerHTML = innerHtml;

}

// const createAddressBookJSON = () => {
// 	let addressBookListLocal = [
// 		{
// 			_name: 'Rameez Shaikh',
// 			_phone: '+91 8805258754',
// 			_address: 'Dosti Enclave, Kurla',
// 			_state: 'Assam',
// 			_city: 'Amritsar',
// 			_zip: '400612',
// 		},
// 		{
// 		_name: 'Alina Syed',
// 		_phone: '+91 8805258754',
// 		_address: 'Piranha Enclave, Kismat',
// 		_state: 'Andhra Pradesh',
// 		_city: 'Agra',
// 		_zip: '400452',
// 		}
// 	];
// 	return addressBookListLocal;
// }

const remove=(node)=> {
	let personData = addressBookList.find(addressBookData=>addressBookData._name==node.name);
	if(!personData) return;
	const index = addressBookList.map(addressBookData=>addressBookData._name).indexOf(personData._name);
	addressBookList.splice(index,1);
	localStorage.setItem("AddressBookList",JSON.stringify(addressBookList));
	createInnerHtml();
}