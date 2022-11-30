import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js';
import { 
  getAuth,
  onAuthStateChanged, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator,
} from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAjMWj2li6n0ZM6SXfH1lXzSLq7sesO2ik",
    authDomain: "nangkring-bang.firebaseapp.com",
    projectId: "nangkring-bang",
    storageBucket: "nangkring-bang.appspot.com",
    messagingSenderId: "724512205413",
    appId: "1:724512205413:web:15d6d1e08675bcc3bdf48c",
    measurementId: "G-4FY8RW11ER"
});

var XUser;
var ZZdata;
var adaData = false;

const emailAuth= async (doc) => {
	const auth = getAuth(firebaseApp);
	onAuthStateChanged(auth, user => {
		if (user) {
		  console.log("ASid", user.uid);
		  console.log("ASemail", user.email);
		  XUser = user.email;
		}
		else{
			console.log("FAKK");
		}
		console.log("AAemail", XUser);//ngga dapet gegara masalah urutan/async
		ZZdata = db.collection('users').doc(XUser).get();

		if((adaData == false)){
			console.log("FA");
			displayUser();
		  }
	  })
	  
	  console.log("ZA", ZZdata);

	  
}

//employee=template
//kategori, menu, tempat, users
let employeeRef = db.collection('employees');
let kategoriRef = db.collection('kategori');
let menuRef = db.collection('menu');
let tempatRef = db.collection('tempat');
let userRef = db.collection('users');
let deleteIDs = [];

var currUser;
var count = 0;
var fileitem;
var filename;
function getfile(e)
{
	fileitem = e.target.files[0];
	filename = fileitem.name;
}

var fileitem_2;
var filename_2;
function getfile_2(e)
{
	fileitem_2 = e.target.files[0];
	filename_2 = fileitem_2.name;
}

// REAL TIME LISTENER
employeeRef.onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
	changes.forEach(change => {
		if (change.type == 'added') {
			console.log('added');
		} else if (change.type == 'modified') {
			console.log('modified');
		} else if (change.type == 'removed') {
			$('tr[data-id=' + change.doc.id + ']').remove();
			console.log('removed');
		}
	});
});
kategoriRef.onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
	changes.forEach(change => {
		if (change.type == 'added') {
			console.log('added');
		} else if (change.type == 'modified') {
			console.log('modified');
		} else if (change.type == 'removed') {
			$('tr[data-id=' + change.doc.id + ']').remove();
			console.log('removed');
		}
	});
});
menuRef.onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
	changes.forEach(change => {
		if (change.type == 'added') {
			console.log('added');
		} else if (change.type == 'modified') {
			console.log('modified');
		} else if (change.type == 'removed') {
			$('tr[data-id=' + change.doc.id + ']').remove();
			console.log('removed');
		}
	});
});
tempatRef.onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
	changes.forEach(change => {
		if (change.type == 'added') {
			console.log('added');
		} else if (change.type == 'modified') {
			console.log('modified');
		} else if (change.type == 'removed') {
			$('tr[data-id=' + change.doc.id + ']').remove();
			console.log('removed');
		}
	});
});
userRef.onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
	changes.forEach(change => {
		if (change.type == 'added') {
			console.log('added');
		} else if (change.type == 'modified') {
			console.log('modified');
		} else if (change.type == 'removed') {
			$('tr[data-id=' + change.doc.id + ']').remove();
			console.log('removed');
		}
	});
});

// GET TOTAL SIZE
employeeRef.onSnapshot(snapshot => {
	let size = snapshot.size;
	$('.employeeCount').text(size);
	if (size == 0) {
		$('#selectAll').attr('disabled', true);
	} else {
		$('#selectAll').attr('disabled', false);
	}
});
kategoriRef.onSnapshot(snapshot => {
	let size = snapshot.size;
	$('.kategoriCount').text(size);
	if (size == 0) {
		$('#selectAll').attr('disabled', true);
	} else {
		$('#selectAll').attr('disabled', false);
	}
});
menuRef.onSnapshot(snapshot => {
	let size = snapshot.size;
	$('.menuCount').text(size);
	if (size == 0) {
		$('#selectAll').attr('disabled', true);
	} else {
		$('#selectAll').attr('disabled', false);
	}
});
tempatRef.onSnapshot(snapshot => {
	let size = snapshot.size;
	$('.tempatCount').text(size);
	if (size == 0) {
		$('#selectAll').attr('disabled', true);
	} else {
		$('#selectAll').attr('disabled', false);
	}
});
userRef.onSnapshot(snapshot => {
	let size = snapshot.size;
	$('.userCount').text(size);
	if (size == 0) {
		$('#selectAll').attr('disabled', true);
	} else {
		$('#selectAll').attr('disabled', false);
	}
});


const displayEmployees = async (doc) => {
	console.log('displayEmployees');

	let employees = employeeRef;
	// .startAfter(doc || 0).limit(10000)

	const data = await employees.get();

	data.docs.forEach(doc => {
		const employee = doc.data();
		let item =
			`<tr data-id="${doc.id}">
					<td>
							<span class="custom-checkbox">
									<input type="checkbox" id="${doc.id}" name="options[]" value="${doc.id}">
									<label for="${doc.id}"></label>
							</span>
					</td>
					<td class="employee-name">${employee.name}</td>
					<td class="employee-email">${employee.email}</td>
					<td class="employee-address">${employee.address}</td>
					<td class="employee-phone">${employee.phone}</td>
					<td>
							<a href="#" id="${doc.id}" class="edit js-edit-employee"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
							</a>
							<a href="#" id="${doc.id}" class="delete js-delete-employee"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
							</a>
					</td>
			</tr>`;

		$('#employee-table').append(item);

		// ACTIVATE TOOLTIP
		$('[data-toggle="tooltip"]').tooltip();

		// SELECT/DESELECT CHECKBOXES
		var checkbox = $('table tbody input[type="checkbox"]');
		$("#selectAll").click(function () {
			if (this.checked) {
				checkbox.each(function () {
					console.log(this.id);
					deleteIDs.push(this.id);
					this.checked = true;
				});
			} else {
				checkbox.each(function () {
					this.checked = false;
				});
			}
		});
		checkbox.click(function () {
			if (!this.checked) {
				$("#selectAll").prop("checked", false);
			}
		});
	})

	// UPDATE LATEST DOC
	latestDoc = data.docs[data.docs.length - 1];

	// UNATTACH EVENT LISTENERS IF NO MORE DOCS
	if (data.empty) {
		$('.js-loadmore').hide();
	}
}
const displayKategori = async (doc) => {
	console.log('displayKategori');

	let kategori = kategoriRef;
	// .startAfter(doc || 0).limit(10000)

	const data = await kategori.get();

	data.docs.forEach(doc => {
		const kategori = doc.data();
		let item =
			`<tr data-id="${doc.id}">
					<td>
							<span class="custom-checkbox">
									<input type="checkbox" id="${doc.id}" name="options[]" value="${doc.id}">
									<label for="${doc.id}"></label>
							</span>
					</td>
					<td class="kategori_name">${kategori.kategori_name}</td>
					<td class="kategori_img">${kategori.kategori_img}</td>
					<td class="kategori_type">${kategori.kategori_type}</td>
					<td>
							<a href="#" id="${doc.id}" class="edit js-edit-kategori"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
							</a>
							<a href="#" id="${doc.id}" class="delete js-delete-kategori"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
							</a>
					</td>
			</tr>`;

		$('#kategori-table').append(item);

		// ACTIVATE TOOLTIP
		$('[data-toggle="tooltip"]').tooltip();

		// SELECT/DESELECT CHECKBOXES
		var checkbox = $('table tbody input[type="checkbox"]');
		$("#selectAll").click(function () {
			if (this.checked) {
				checkbox.each(function () {
					console.log(this.id);
					deleteIDs.push(this.id);
					this.checked = true;
				});
			} else {
				checkbox.each(function () {
					this.checked = false;
				});
			}
		});
		checkbox.click(function () {
			if (!this.checked) {
				$("#selectAll").prop("checked", false);
			}
		});
	})

	// UPDATE LATEST DOC
	latestDoc = data.docs[data.docs.length - 1];

	// UNATTACH EVENT LISTENERS IF NO MORE DOCS
	if (data.empty) {
		$('.js-loadmore').hide();
	}
}
const displayMenu = async (doc) => {
	console.log('displayMenu');

	let menu = menuRef;
	// .startAfter(doc || 0).limit(10000)

	const data = await menu.get();

	data.docs.forEach(doc => {
		const menu = doc.data();
		let item =
			`<tr data-id="${doc.id}">
					<td>
							<span class="custom-checkbox">
									<input type="checkbox" id="${doc.id}" name="options[]" value="${doc.id}">
									<label for="${doc.id}"></label>
							</span>
					</td>
					<td class="menu_nama">${menu.menu_nama}</td>
					<td class="menu_desk">${menu.menu_desk}</td>
					<td class="menu_harga">${menu.menu_harga}</td>
					<td class="menu_img_1">${menu.menu_img[0]}</td>
					<td class="menu_img_2">${menu.menu_img[1]}</td>
					<td class="menu_kategori">${menu.menu_kategori}</td>
					<td class="menu_owner">${menu.menu_owner}</td>
					<td class="menu_stok">${menu.menu_stok}</td>
					<td>
							<a href="#" id="${doc.id}" class="edit js-edit-menu"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
							</a>
							<a href="#" id="${doc.id}" class="delete js-delete-menu"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
							</a>
					</td>
			</tr>`;

		$('#menu-table').append(item);

		// ACTIVATE TOOLTIP
		$('[data-toggle="tooltip"]').tooltip();

		// SELECT/DESELECT CHECKBOXES
		var checkbox = $('table tbody input[type="checkbox"]');
		$("#selectAll").click(function () {
			if (this.checked) {
				checkbox.each(function () {
					console.log(this.id);
					deleteIDs.push(this.id);
					this.checked = true;
				});
			} else {
				checkbox.each(function () {
					this.checked = false;
				});
			}
		});
		checkbox.click(function () {
			if (!this.checked) {
				$("#selectAll").prop("checked", false);
			}
		});
	})

	// UPDATE LATEST DOC
	latestDoc = data.docs[data.docs.length - 1];

	// UNATTACH EVENT LISTENERS IF NO MORE DOCS
	if (data.empty) {
		$('.js-loadmore').hide();
	}
}
const displayTempat = async (doc) => {
	console.log('displayTempat');

	let tempat = tempatRef;
	// .startAfter(doc || 0).limit(10000)

	const data = await tempat.get();

	data.docs.forEach(doc => {
		const tempat = doc.data();
		let item =
			`<tr data-id="${doc.id}">
					<td>
							<span class="custom-checkbox">
									<input type="checkbox" id="${doc.id}" name="options[]" value="${doc.id}">
									<label for="${doc.id}"></label>
							</span>
					</td>
					<td class="tempat_nama">${tempat.tempat_nama}</td>
					<td class="tempat_buka">${tempat.tempat_buka}</td>
					<td class="tempat_email">${tempat.tempat_email}</td>
					<td class="tempat_img">${tempat.tempat_img[0]}</td>
					<td class="tempat_img_2">${tempat.tempat_img[1]}</td>
					<td class="tempat_lokasi">${tempat.tempat_lokasi}</td>
					<td class="tempat_owner">${tempat.tempat_owner}</td>
					<td class="tempat_status">${tempat.tempat_status}</td>
					<td class="tempat_telp">${tempat.tempat_telp}</td>
					<td class="tempat_tutup">${tempat.tempat_tutup}</td>
					<td class="tempat_kategori">${tempat.tempat_kategori}</td>
					<td>
							<a href="#" id="${doc.id}" class="edit js-edit-tempat"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
							</a>
							<a href="#" id="${doc.id}" class="delete js-delete-tempat"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
							</a>
					</td>
			</tr>`;

		$('#tempat-table').append(item);

		// ACTIVATE TOOLTIP
		$('[data-toggle="tooltip"]').tooltip();

		// SELECT/DESELECT CHECKBOXES
		var checkbox = $('table tbody input[type="checkbox"]');
		$("#selectAll").click(function () {
			if (this.checked) {
				checkbox.each(function () {
					console.log(this.id);
					deleteIDs.push(this.id);
					this.checked = true;
				});
			} else {
				checkbox.each(function () {
					this.checked = false;
				});
			}
		});
		checkbox.click(function () {
			if (!this.checked) {
				$("#selectAll").prop("checked", false);
			}
		});
	})

	// UPDATE LATEST DOC
	latestDoc = data.docs[data.docs.length - 1];

	// UNATTACH EVENT LISTENERS IF NO MORE DOCS
	if (data.empty) {
		$('.js-loadmore').hide();
	}
}
const displayUser = async (doc) => {
	let userr = userRef;//tambahin sangkutan UID .doc(id)
	// .startAfter(doc || 0).limit(10000)

	const data = await userr.get();
	console.log('displayUser');
	const auth = getAuth(firebaseApp);
	var ZUser = await emailAuth();
	onAuthStateChanged(auth, user => {
		if (user) {
		  console.log("Sid", user.uid);
		  console.log("Semail", user.email);
		}
		else{
			console.log("FAKK");
		}
		console.log("AAAemail", ZUser);//ngga dapet gegara masalah urutan/async
	  })
	  
	console.log("XX", XUser);

	
	//console.log("emailXX", user.email);
	console.log("SWS", data.docs);//disini dapet

	data.docs.forEach(doc => {
		const user = doc.data();
		const date = user.user_register;
		console.log(date.toDate());
		if((user.user_email == XUser)&&(adaData == false)){
		let item =
			`<tr data-id="${doc.id}">
					<td class="user_nama">${user.user_nama}</td>
					<td class="user_alamat">${user.user_alamat}</td>
					<td class="user_email">${user.user_email}</td>
					<td class="user_img">${user.user_img}</td>
					<td class="user_telp">${user.user_telp}</td>
					<td class="user_type">${user.user_type}</td>
					<td class="user_username">${user.user_username}</td>
					<td class="user_register">${date.toDate()}</td>
					<td class="user_favorit"> <a href="#" id="${doc.id}" class="favorit js-favorit-user"><i class="material-icons" data-toggle="tooltip" title="Favorit">&#xe838;</i></a></td>
					<td class="user_pesanan"> <a href="#" id="${doc.id}" class="pesanan js-pesanan-user"><i class="material-icons" data-toggle="tooltip" title="Pesanan">&#xef41;</i></a></td>
					<td>
							<a href="#" id="${doc.id}" class="edit js-edit-user"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
							</a>
					</td>
			</tr>`;
			

		$('#user-table').append(item);
		adaData = true;
		}

		// ACTIVATE TOOLTIP
		$('[data-toggle="tooltip"]').tooltip();

		// SELECT/DESELECT CHECKBOXES
		var checkbox = $('table tbody input[type="checkbox"]');
		$("#selectAll").click(function () {
			if (this.checked) {
				checkbox.each(function () {
					console.log(this.id);
					deleteIDs.push(this.id);
					this.checked = true;
				});
			} else {
				checkbox.each(function () {
					this.checked = false;
				});
			}
		});
		checkbox.click(function () {
			if (!this.checked) {
				$("#selectAll").prop("checked", false);
			}
		});
	})

	// UPDATE LATEST DOC
	latestDoc = data.docs[data.docs.length - 1];

	// UNATTACH EVENT LISTENERS IF NO MORE DOCS
	if (data.empty) {
		$('.js-loadmore').hide();
	}
}

//[]

const displayPesanan = async (doc) => {
	console.log('displayPesanan', count);
	if(count >= 1){
		$('#pesanan-isi').slice(0).remove();//!!
		console.log('CSC');
		count = 0;

		var isi = 
		`<tbody id="pesanan-isi">
		</tbody>`;
		$('#pesanan-table').append(isi);
	}

	// .startAfter(doc || 0).limit(10000)

	const data = await db.collection('users').doc(currUser).collection('pesanan').get();//ntah doc(id) ato collection('pesanan') yang ngga bisa nangkep, or maybe both
	console.log("SS1", data.docs, currUser);

	data.docs.forEach(async doc => {
		

		const pesanan = doc.data();
		const tBayar = pesanan.pesanan_tgl_bayar;
		const tOrder = pesanan.pesanan_tgl_order;
		count++;
		
		let item = 
		`<tr data-id="${doc.id}">
			<td class="pesanan_bukti">${pesanan.pesanan_bukti}</td>
			<td class="pesanan_catatan">${pesanan.pesanan_catatan}</td>
			<td class="pesanan_metode">${pesanan.pesanan_metode}</td>
			<td class="pesanan_status">${pesanan.pesanan_status}</td>
			<td class="pesanan_sub">${pesanan.pesanan_sub}</td>
			<td class="pesanan_tgl_bayar">${tBayar.toDate()}</td>
			<td class="pesanan_tgl_order">${tOrder.toDate()}</td>
			<td class="pesanan_kurir">
			<select id="pesanan_kurir">
				<option value="none" selected disabled hidden>Pilih Driver</option>
  			</select>
			</td>
			
			<td class="pesanan_ok" id="${doc.id}"> 
			<input id="input" name="${doc.id}" class="pesanan_ok js-pesanan-ok" type="submit" value="OK">
			<a href="#"></a></td>
		</tr>`;
		console.log('xoun', count);
		$('#pesanan-isi').append(item);

		//X
		const isi = await db.collection('users').get();
		console.log("ISISSISII", isi.docs);
		isi.docs.forEach(async is =>{
			const kurr = is.data();
			console.log(kurr);
			if(kurr.user_type == 'driver'){
				console.log(is.id);
				let isian =`
				<option value="${is.id}">${kurr.user_nama}</option>
				`
				console.log(isian);//disini ada, rtapi kalo dikluarin dari } bawah ngga muncul
				$('#pesanan_kurir').append(isian);
			}
		});
		//
	})

	// UPDATE LATEST DOC
	latestDoc = data.docs[data.docs.length - 1];

	// UNATTACH EVENT LISTENERS IF NO MORE DOCS
	if (data.empty) {
		$('.js-loadmore').hide();
	}
}

//

$(document).ready(function () {

	let latestDoc = null;

	// LOAD INITIAL DATA
	displayEmployees();
	displayKategori();
	displayMenu();
	displayTempat();
	displayUser();

	// LOAD MORE
	$(document).on('click', '.js-loadmore', function () {
		displayEmployees(latestDoc);
		displayKategori(latestDoc);
		displayMenu(latestDoc);
		displayTempat(latestDoc);
		displayUser(latestDoc);
	});

	// ADD EMPLOYEE
	$("#add-employee-form").submit(function (event) {
		event.preventDefault();
		let employeeName = $('#employee-name').val();
		let employeeEmail = $('#employee-email').val();
		let employeeAddress = $('#employee-address').val();
		let employeePhone =  $('#employee-phone').val();
		db.collection('employees').add({
			name: employeeName,
			email: employeeEmail,
			address: employeeAddress,
			phone: employeePhone,
			createdAt : firebase.firestore.FieldValue.serverTimestamp()
			}).then(function (docRef) {
				console.log("Document written with ID: ", docRef.id);
				$("#addEmployeeModal").modal('hide');

				let newEmployee =
				`<tr data-id="${docRef.id}">
						<td>
								<span class="custom-checkbox">
										<input type="checkbox" id="${docRef.id}" name="options[]" value="${docRef.id}">
										<label for="${docRef.id}"></label>
								</span>
						</td>
						<td class="employee-name">${employeeName}</td>
						<td class="employee-email">${employeeEmail}</td>
						<td class="employee-address">${employeeAddress}</td>
						<td class="employee-phone">${employeePhone}</td>
						<td>
								<a href="#" id="${docRef.id}" class="edit js-edit-employee"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
								</a>
								<a href="#" id="${docRef.id}" class="delete js-delete-employee"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
								</a>
						</td>
				</tr>`;

			$('#employee-table tbody').prepend(newEmployee);
			})
			.catch(function (error) {
				console.error("Error writing document: ", error);
			});
	});

	// ADD KATEGORI
	$("#add-kategori-form").submit(function (event) {
		event.preventDefault();
		//let kategoriImg = $('#kategori_img').val();
		let kategoriName = $('#kategori_name').val();
		let kategoriType = $('#kategori_type').val();
		let storage = firebase.storage().ref("foto kategori/"+filename);
		let upload = storage.put(fileitem);
		upload.on("state_changed");
		db.collection('kategori').add({
			kategori_img: filename,
			kategori_name: kategoriName,
			kategori_type: kategoriType,
			}).then(function (docRef) {
				console.log("Document written with ID: ", docRef.id);
				$("#addKategoriModal").modal('hide');

				let newKategori =
				`<tr data-id="${docRef.id}">
						<td>
								<span class="custom-checkbox">
										<input type="checkbox" id="${docRef.id}" name="options[]" value="${docRef.id}">
										<label for="${docRef.id}"></label>
								</span>
						</td>
						<td class="kategori_name">${kategoriName}</td>
						<td class="kategori_img">${filename}</td>
						<td class="kategori_type">${kategoriType}</td>
						<td>
								<a href="#" id="${docRef.id}" class="edit js-edit-kategori"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
								</a>
								<a href="#" id="${docRef.id}" class="delete js-delete-kategori"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
								</a>
						</td>
				</tr>`;

			$('#kategori-table tbody').prepend(newKategori);
			})
			.catch(function (error) {
				console.error("Error writing document: ", error);
			});
	});

	// ADD MENU//[]
	$("#add-menu-form").submit(function (event) {
		event.preventDefault();
		let menuDesk = $('#menu_desk').val();
		let menuHarga = $('#menu_harga').val();
		//let menuImg = $('#menu_img').val();
		let menuKategori = $('#menu_kategori').val();
		let menuNama = $('#menu_nama').val();
		let menuOwner = $('#menu_owner').val();
		let menuStok = $('#menu_stok').val();
		let storage = firebase.storage().ref("foto makanan/"+filename);
		let upload = storage.put(fileitem);
		upload.on("state_changed");
		let storage_2 = firebase.storage().ref("foto makanan/"+filename_2);
		let upload_2 = storage_2.put(fileitem_2);
		upload_2.on("state_changed");
		db.collection('menu').add({
			menu_desk: menuDesk,
			menu_harga: menuHarga,
			menu_img: [filename, filename_2],
			menu_kategori: menuKategori,
			menu_nama: menuNama,
			menu_owner: menuOwner,
			menu_stok: menuStok
			}).then(function (docRef) {
				console.log("Document written with ID: ", docRef.id);
				$("#addMenuModal").modal('hide');

				let newMenu =
				`<tr data-id="${docRef.id}">
						<td>
								<span class="custom-checkbox">
										<input type="checkbox" id="${docRef.id}" name="options[]" value="${docRef.id}">
										<label for="${docRef.id}"></label>
								</span>
						</td>
						<td class="menu_desk">${menuDesk}</td>
						<td class="menu_harga">${menuHarga}</td>
						<td class="menu_img_1">${filename}</td>
						<td class="menu_img_2">${filename_2}</td>
						<td class="menu_kategori">${menuKategori}</td>
						<td class="menu_nama">${menuNama}</td>
						<td class="menu_owner">${menuOwner}</td>
						<td class="menu_stok">${menuStok}</td>
						<td>
								<a href="#" id="${docRef.id}" class="edit js-edit-menu"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
								</a>
								<a href="#" id="${docRef.id}" class="delete js-delete-menu"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
								</a>
						</td>
				</tr>`;

			$('#menu-table tbody').prepend(newMenu);
			})
			.catch(function (error) {
				console.error("Error writing document: ", error);
			});
	});

	// ADD TEMPAT
	$("#add-tempat-form").submit(function (event) {
		event.preventDefault();
		let tempatNama = $('#tempat_nama').val();
		let tempatBuka = Number($('#tempat_buka').val());
		let tempatEmail = $('#tempat_email').val();
		//let tempatImg = $('#tempat_img').val();
		let tempatLokasi = $('#tempat_lokasi').val();
		let tempatOwner = $('#tempat_owner').val();
		let tempatStatus = $('#tempat_status').val();
		let tempatTelp = $('#tempat_telp').val();
		let tempatTutup = Number($('#tempat_tutup').val());
		let tempatKategori = $('#tempat_kategori').val();
		let storage = firebase.storage().ref("foto tempat/"+filename);
		let upload = storage.put(fileitem);
		upload.on("state_changed");
		db.collection('tempat').add({
			tempat_nama: tempatNama,
			tempat_buka: tempatBuka,
			tempat_email: tempatEmail,
			tempat_img: [filename, filename_2],
			tempat_lokasi: tempatLokasi,
			tempat_owner: tempatOwner,
			tempat_status: tempatStatus,
			tempat_telp: tempatTelp,
			tempat_tutup: tempatTutup,
			tempat_kategori: tempatKategori
			}).then(function (docRef) {
				console.log("Document written with ID: ", docRef.id);
				$("#addTempatModal").modal('hide');

				let newMenu =
				`<tr data-id="${docRef.id}">
						<td>
								<span class="custom-checkbox">
										<input type="checkbox" id="${docRef.id}" name="options[]" value="${docRef.id}">
										<label for="${docRef.id}"></label>
								</span>
						</td>
						<td class="tempat_nama">${tempatNama}</td>
						<td class="tempat_buka">${tempatBuka}</td>
						<td class="tempat_email">${tempatEmail}</td>
						<td class="tempat_img">${filename}</td>
						<td class="tempat_img_2">${filename_2}</td>
						<td class="tempat_lokasi">${tempatLokasi}</td>
						<td class="tempat_owner">${tempatOwner}</td>
						<td class="tempat_status">${tempatStatus}</td>
						<td class="tempat_telp">${tempatTelp}</td>
						<td class="tempat_tutup">${tempatTutup}</td>
						<td class="tempat_kategori">${tempatKategori}</td>
						<td>
								<a href="#" id="${docRef.id}" class="edit js-edit-tempat"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
								</a>
								<a href="#" id="${docRef.id}" class="delete js-delete-tempat"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
								</a>
						</td>
				</tr>`;

			$('#tempat-table tbody').prepend(newMenu);
			})
			.catch(function (error) {
				console.error("Error writing document: ", error);
			});
	});

	// ADD USER
	$("#add-user-form").submit(function (event) {
		event.preventDefault();
		let userNama = $('#user_nama').val();
		let userAlamat = $('#user_alamat').val();
		let userEmail = $('#user_email').val();
		//let userImg = $('#user_img').val();
		let userPass = $('#user_password').val();
		let userTelp = $('#user_telp').val();
		let userType = $('#user_type').val();
		let userUsername = $('#user_username').val();
		let userRegister = $('#user_register').val();
		let storage = firebase.storage().ref("foto profile/"+filename);
		let upload = storage.put(fileitem);
		upload.on("state_changed");
		db.collection('users').add({
			user_nama: userNama,
			user_alamat: userAlamat,
			user_email: userEmail,
			user_img: filename,
			user_password: userPass,
			user_telp: userTelp,
			user_type: userType,
			user_username: userUsername,
			user_register: userRegister
			}).then(function (docRef) {
				console.log("Document written with ID: ", docRef.id);
				$("#addUserModal").modal('hide');

				let newMenu =
				`<tr data-id="${docRef.id}">
						<td>
								<span class="custom-checkbox">
										<input type="checkbox" id="${docRef.id}" name="options[]" value="${docRef.id}">
										<label for="${docRef.id}"></label>
								</span>
						</td>
						<td class="user_nama">${userNama}</td>
						<td class="user_alamat">${userAlamat}</td>
						<td class="user_email">${userEmail}</td>
						<td class="user_img">${filename}</td>
						<td class="user_password">${userPass}</td>
						<td class="user_telp">${userTelp}</td>
						<td class="user_type">${userType}</td>
						<td class="user_username">${userUsername}</td>
						<td class="user_register">${userRegister}</td>
						<td class="user_favorit"> <a href="#" id="${docRef.id}" class="favorit js-favorit-user"><i class="material-icons" data-toggle="tooltip" title="Favorit">&#xe838;</i></a></td>
						<td class="user_pesanan"> <a href="#" id="${docRef.id}" class="pesanan js-pesanan-user"><i class="material-icons" data-toggle="tooltip" title="Pesanan">&#xef41;</i></a></td>
						<td>
								<a href="#" id="${docRef.id}" class="edit js-edit-user"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
								</a>
								<a href="#" id="${docRef.id}" class="delete js-delete-user"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
								</a>
						</td>
				</tr>`;

			$('#user-table tbody').prepend(newMenu);
			})
			.catch(function (error) {
				console.error("Error writing document: ", error);
			});
	});

/////////////////////
//UPDATE
/////////////////////

	// UPDATE EMPLOYEE
	$(document).on('click', '.js-edit-employee', function (e) {
		e.preventDefault();
		let id = $(this).attr('id');
		$('#edit-employee-form').attr('edit-id', id);
		db.collection('employees').doc(id).get().then(function (document) {
			if (document.exists) {
				$('#edit-employee-form #employee-name').val(document.data().name);
				$('#edit-employee-form #employee-email').val(document.data().email);
				$('#edit-employee-form #employee-address').val(document.data().address);
				$('#edit-employee-form #employee-phone').val(document.data().phone);
				$('#editEmployeeModal').modal('show');
			} else {
				console.log("No such document!");
			}
		}).catch(function (error) {
			console.log("Error getting document:", error);
		});
	});

	$("#edit-employee-form").submit(function (event) {
		event.preventDefault();
		let id = $(this).attr('edit-id');
		let employeeName = $('#edit-employee-form #employee-name').val();
		let employeeEmail = $('#edit-employee-form #employee-email').val();
		let employeeAddress = $('#edit-employee-form #employee-address').val();
		let employeePhone =  $('#edit-employee-form  #employee-phone').val();

		db.collection('employees').doc(id).update({
			name: employeeName,
			email: employeeEmail,
			address: employeeAddress,
			phone: employeePhone,
			updatedAt : firebase.firestore.FieldValue.serverTimestamp()
		});

		$('#editEmployeeModal').modal('hide');

		// SHOW UPDATED DATA ON BROWSER
		$('tr[data-id=' + id + '] td.employee-name').html(employeeName);
		$('tr[data-id=' + id + '] td.employee-email').html(employeeEmail);
		$('tr[data-id=' + id + '] td.employee-address').html(employeeAddress);
		$('tr[data-id=' + id + '] td.employee-phone').html(employeePhone);
	});

	// UPDATE KATEGORI
	$(document).on('click', '.js-edit-kategori', function (e) {
		e.preventDefault();
		let id = $(this).attr('id');
		$('#edit-kategori-form').attr('edit-id', id);
		db.collection('kategori').doc(id).get().then(function (document) {
			if (document.exists) {
				//$('#edit-kategori-form #kategori_img').val(document.data().kategori_img);
				$('#edit-kategori-form #kategori_name').val(document.data().kategori_name);
				$('#edit-kategori-form #kategori_type').val(document.data().kategori_type);
				$('#editKategoriModal').modal('show');
			} else {
				console.log("No such document!");
			}
		}).catch(function (error) {
			console.log("Error getting document:", error);
		});
	});

	$("#edit-kategori-form").submit(function (event) {
		event.preventDefault();
		let id = $(this).attr('edit-id');
		//let kategoriImg = $('#edit-kategori-form #kategori_img').val();
		let kategoriName = $('#edit-kategori-form #kategori_name').val();
		let kategoriType = $('#edit-kategori-form #kategori_type').val();
		let storage = firebase.storage().ref("foto kategori/"+filename);
		let upload = storage.put(fileitem);
		upload.on("state_changed");

		db.collection('kategori').doc(id).update({
			kategori_img: filename,
			kategori_name: kategoriName,
			kategori_type: kategoriType
		});

		$('#editKategoriModal').modal('hide');

		// SHOW UPDATED DATA ON BROWSER
		$('tr[data-id=' + id + '] td.kategori_img').html(kategoriImg);
		$('tr[data-id=' + id + '] td.kategori_name').html(kategoriName);
		$('tr[data-id=' + id + '] td.kategori_type').html(kategoriType);
	});

	// UPDATE MENU
	$(document).on('click', '.js-edit-menu', function (e) {
		e.preventDefault();
		let id = $(this).attr('id');
		$('#edit-menu-form').attr('edit-id', id);
		db.collection('menu').doc(id).get().then(function (document) {
			if (document.exists) {
				$('#edit-menu-form #menu_desk').val(document.data().menu_desk);
				$('#edit-menu-form #menu_harga').val(document.data().menu_harga);
				//$('#edit-menu-form #menu_img').val(document.data().menu_img);
				$('#edit-menu-form #menu_kategori').val(document.data().menu_kategori);
				$('#edit-menu-form #menu_nama').val(document.data().menu_nama);
				$('#edit-menu-form #menu_owner').val(document.data().menu_owner);
				$('#edit-menu-form #menu_stok').val(document.data().menu_stok);
				$('#editMenuModal').modal('show');
			} else {
				console.log("No such document!");
			}
		}).catch(function (error) {
			console.log("Error getting document:", error);
		});
	});

	$("#edit-menu-form").submit(function (event) {
		event.preventDefault();
		let id = $(this).attr('edit-id');
		let menuDesk = $('#edit-menu-form #menu_desk').val();
		let menuHarga = $('#edit-menu-form #menu_harga').val();
		//let menuImg = $('#edit-menu-form #menu_img').val();
		let menuKategori = $('#edit-menu-form #menu_kategori').val();
		let menuNama = $('#edit-menu-form #menu_nama').val();
		let menuOwner = $('#edit-menu-form #menu_owner').val();
		let menuStok = $('#edit-menu-form #menu_stok').val();
		let storage = firebase.storage().ref("foto makanan/"+filename);
		let upload = storage.put(fileitem);
		upload.on("state_changed");
		let storage_2 = firebase.storage().ref("foto makanan/"+filename_2);
		let upload_2 = storage_2.put(fileitem_2);
		upload_2.on("state_changed");

		db.collection('menu').doc(id).update({
			menu_desk: menuDesk,
			menu_harga: menuHarga,
			menu_img: [filename,filename_2],
			menu_kategori: menuKategori,
			menu_nama: menuNama,
			menu_owner: menuOwner,
			menu_stok: menuStok
		});

		$('#editMenuModal').modal('hide');

		// SHOW UPDATED DATA ON BROWSER
		$('tr[data-id=' + id + '] td.menu_desk').html(menuDesk);
		$('tr[data-id=' + id + '] td.menu_harga').html(menuHarga);
		$('tr[data-id=' + id + '] td.menu_img_1').html(menu_img[0]);
		$('tr[data-id=' + id + '] td.menu_img_2').html(menu_img[1]);
		$('tr[data-id=' + id + '] td.menu_kategori').html(menuKategori);
		$('tr[data-id=' + id + '] td.menu_nama').html(menuNama);
		$('tr[data-id=' + id + '] td.menu_owner').html(menuOwner);
		$('tr[data-id=' + id + '] td.menu_stok').html(menuStok);
	});

	// UPDATE TEMPAT
	$(document).on('click', '.js-edit-tempat', function (e) {
		e.preventDefault();
		let id = $(this).attr('id');
		$('#edit-tempat-form').attr('edit-id', id);
		db.collection('tempat').doc(id).get().then(function (document) {
			if (document.exists) {
				$('#edit-tempat-form #tempat_nama ').val(document.data().tempat_nama);
				$('#edit-tempat-form #tempat_buka ').val(document.data().tempat_buka);
				$('#edit-tempat-form #tempat_email ').val(document.data().tempat_email);
				//$('#edit-tempat-form #tempat_img ').val(document.data().tempat_img);
				$('#edit-tempat-form #tempat_lokasi ').val(document.data().tempat_lokasi);
				$('#edit-tempat-form #tempat_owner ').val(document.data().tempat_owner);
				$('#edit-tempat-form #tempat_status ').val(document.data().tempat_status);
				$('#edit-tempat-form #tempat_telp ').val(document.data().tempat_telp);
				$('#edit-tempat-form #tempat_tutup ').val(document.data().tempat_tutup);
				$('#edit-tempat-form #tempat_kategori ').val(document.data().tempat_kategori);
				$('#editTempatModal').modal('show');
			} else {
				console.log("No such document!");
			}
		}).catch(function (error) {
			console.log("Error getting document:", error);
		});
	});

	$("#edit-tempat-form").submit(function (event) {
		event.preventDefault();
		let id = $(this).attr('edit-id');
		let tempatNama = $('#edit-tempat-form #tempat_nama').val();
		let tempatBuka = Number($('#edit-tempat-form #tempat_buka').val());
		let tempatEmail = $('#edit-tempat-form #tempat_email').val();
		//let tempatImg = $('#edit-tempat-form #tempat_img').val();
		let tempatLokasi = $('#edit-tempat-form #tempat_lokasi').val();
		let tempatOwner = $('#edit-tempat-form #tempat_owner').val();
		let tempatStatus = $('#edit-tempat-form #tempat_status').val();
		let tempatTelp = $('#edit-tempat-form #tempat_telp').val();
		let tempatTutup = Number($('#edit-tempat-form #tempat_tutup').val());
		let tempatKategori = $('#edit-tempat-form #tempat_kategori').val();
		let storage = firebase.storage().ref("foto tempat/"+filename);
		let upload = storage.put(fileitem);
		upload.on("state_changed");
		let storage_2 = firebase.storage().ref("foto tempat/"+filename_2);
		let upload_2 = storage_2.put(fileitem_2);
		upload_2.on("state_changed");

		db.collection('tempat').doc(id).update({
			tempat_nama: tempatNama,
			tempat_buka: tempatBuka,
			tempat_email: tempatEmail,
			tempat_img: [filename,filename_2],
			tempat_lokasi: tempatLokasi,
			tempat_owner: tempatOwner,
			tempat_status: tempatStatus,
			tempat_telp: tempatTelp,
			tempat_tutup: tempatTutup,
			tempat_kategori: tempatKategori
		});

		$('#editTempatModal').modal('hide');

		// SHOW UPDATED DATA ON BROWSER
		$('tr[data-id=' + id + '] td.tempat_nama').html(tempatNama);
		$('tr[data-id=' + id + '] td.tempat_buka').html(tempatBuka);
		$('tr[data-id=' + id + '] td.tempat_email').html(tempatEmail);
		$('tr[data-id=' + id + '] td.tempat_img').html(filename);
		$('tr[data-id=' + id + '] td.tempat_img_2').html(filename_2);
		$('tr[data-id=' + id + '] td.tempat_lokasi').html(tempatLokasi);
		$('tr[data-id=' + id + '] td.tempat_owner').html(tempatOwner);
		$('tr[data-id=' + id + '] td.tempat_status').html(tempatStatus);
		$('tr[data-id=' + id + '] td.tempat_telp').html(tempatTelp);
		$('tr[data-id=' + id + '] td.tempat_tutup').html(tempatTutup);
		$('tr[data-id=' + id + '] td.tempat_kategori').html(tempatKategori);
	});

	// UPDATE USER
	$(document).on('click', '.js-edit-user', function (e) {
		e.preventDefault();
		let id = $(this).attr('id');
		$('#edit-user-form').attr('edit-id', id);
		db.collection('users').doc(id).get().then(function (document) {
			if (document.exists) {
				$('#edit-user-form #user_nama ').val(document.data().user_nama);
				$('#edit-user-form #user_alamat ').val(document.data().user_alamat);
				$('#edit-user-form #user_email ').val(document.data().user_email);
				//$('#edit-user-form #user_img ').val(document.data().user_img);
				$('#edit-user-form #user_password ').val(document.data().user_password);
				$('#edit-user-form #user_telp ').val(document.data().user_telp);
				$('#edit-user-form #user_type ').val(document.data().user_type);
				$('#edit-user-form #user_username ').val(document.data().user_username);
				$('#edit-user-form #user_register ').val(document.data().user_register);
				$('#editUserModal').modal('show');
			} else {
				console.log("No such document!");
			}
		}).catch(function (error) {
			console.log("Error getting document:", error);
		});
	});

	$("#edit-user-form").submit(function (event) {
		event.preventDefault();
		let id = $(this).attr('edit-id');
		let userNama = $('#edit-user-form #user_nama').val();
		let userAlamat = $('#edit-user-form #user_alamat').val();
		//let userImg = $('#edit-user-form #user_img').val();
		let userPass = $('#edit-user-form #user_password').val();
		let userTelp = $('#edit-user-form #user_telp').val();
		let userType = $('#edit-user-form #user_type').val();
		let userUsername = $('#edit-user-form #user_username').val();
		let storage = firebase.storage().ref("foto profile/"+filename);
		let upload = storage.put(fileitem);
		upload.on("state_changed");

		db.collection('users').doc(id).update({
			user_nama: userNama,
			user_alamat: userAlamat,
			user_img: filename,
			user_password: userPass,
			user_telp: userTelp,
			user_type: userType,
			user_username: userUsername
		});

		$('#editUserModal').modal('hide');

		// SHOW UPDATED DATA ON BROWSER
		$('tr[data-id=' + id + '] td.user_nama').html(userNama);
		$('tr[data-id=' + id + '] td.user_alamat').html(userAlamat);
		$('tr[data-id=' + id + '] td.user_email').html(userEmail);
		$('tr[data-id=' + id + '] td.user_img').html(filename);
		$('tr[data-id=' + id + '] td.user_password').html(userPass);
		$('tr[data-id=' + id + '] td.user_telp').html(userTelp);
		$('tr[data-id=' + id + '] td.user_type').html(userType);
		$('tr[data-id=' + id + '] td.user_username').html(userUsername);
		$('tr[data-id=' + id + '] td.user_register').html(userRegister);
	});

//-----------------
//COLLECTION INSIDE COLLECTION USER
//-----------------

// FAVORIT USER
//TBA KARENA HARUSNYA NYAMBUNG SAMA DB MENU

// PESANAN USER
$(document).on('click', '.js-pesanan-user', function (e) {
	e.preventDefault();
	let id = $(this).attr('id');
	$('#pesanan-user-form').attr('pesanan-id', id);
	$('#pesananUserModal').modal('show');
	user_namaA.innerHTML = id;
	currUser = id;
	displayPesanan();

	//const data = await db.collection('users').doc(id).collection('pesanan').get();
	
	db.collection('users').doc(id).collection('pesanan').get().then(function (document) {
		
		if (document.exists) {
			console.log("There's a document!SS");
			$('#pesanan-user-form #user_nama ').val(id);
		} else {
			console.log("No such document!SS");
		}
	}).catch(function (error) {
		console.log("Error getting document:", error);
	});
	
});

$("#edit-user-form").submit(function (event) {
	event.preventDefault();
	let id = $(this).attr('edit-id');
	let userNama = $('#edit-user-form #user_nama').val();
	let userAlamat = $('#edit-user-form #user_alamat').val();
	let userEmail = $('#edit-user-form #user_email').val();
	//let userImg = $('#edit-user-form #user_img').val();
	let userPass = $('#edit-user-form #user_password').val();
	let userTelp = $('#edit-user-form #user_telp').val();
	let userType = $('#edit-user-form #user_type').val();
	let userUsername = $('#edit-user-form #user_username').val();
	let userRegister = $('#edit-user-form #user_register').val();
	let storage = firebase.storage().ref("foto profile/"+filename);
	let upload = storage.put(fileitem);
	upload.on("state_changed");

	db.collection('users').doc(id).update({
		user_nama: userNama,
		user_alamat: userAlamat,
		user_email: userEmail,
		user_img: filename,
		user_password: userPass,
		user_telp: userTelp,
		user_type: userType,
		user_username: userUsername,
		user_register: userRegister
	});

	$('#editUserModal').modal('hide');

	// SHOW UPDATED DATA ON BROWSER
	$('tr[data-id=' + id + '] td.user_nama').html(userNama);
	$('tr[data-id=' + id + '] td.user_alamat').html(userAlamat);
	$('tr[data-id=' + id + '] td.user_email').html(userEmail);
	$('tr[data-id=' + id + '] td.user_img').html(filename);
	$('tr[data-id=' + id + '] td.user_password').html(userPass);
	$('tr[data-id=' + id + '] td.user_telp').html(userTelp);
	$('tr[data-id=' + id + '] td.user_type').html(userType);
	$('tr[data-id=' + id + '] td.user_username').html(userUsername);
	$('tr[data-id=' + id + '] td.user_register').html(userRegister);
});

// PESANAN OK (DRIVER DIPILIH)
	$('#pesanan-user-form').submit(function(event){
		//evemt
		event.preventDefault();
		let idAdmin = $('#pesanan-user-form').attr('pesanan-id');//id admin
		let idPesanan = $(this.input).attr('name');//id pesanan 
		let idDriver = $(this.pesanan_kurir);//iud DRiver, value// ini udah select id pesanan_kurir tapi gamau ambil isinya
		console.log('idaa', currUser);//vf
		console.log('idbb', idPesanan);//vf
		console.log('idcc', idDriver);//vf


		db.collection('users').doc(idAdmin).collection('pesanan').doc(idPesanan).collection('pesanan_kurir').doc(idDriver).update({
			pesanan_driver: idDriver
		})
	});//???


$("#edit-user-form").submit(function (event) {
	event.preventDefault();
	let id = $(this).attr('edit-id');
	let userNama = $('#edit-user-form #user_nama').val();
	let userAlamat = $('#edit-user-form #user_alamat').val();
	let userEmail = $('#edit-user-form #user_email').val();
	//let userImg = $('#edit-user-form #user_img').val();
	let userPass = $('#edit-user-form #user_password').val();
	let userTelp = $('#edit-user-form #user_telp').val();
	let userType = $('#edit-user-form #user_type').val();
	let userUsername = $('#edit-user-form #user_username').val();
	let userRegister = $('#edit-user-form #user_register').val();
	let storage = firebase.storage().ref("foto profile/"+filename);
	let upload = storage.put(fileitem);
	upload.on("state_changed");

	db.collection('users').doc(id).update({
		user_nama: userNama,
		user_alamat: userAlamat,
		user_email: userEmail,
		user_img: filename,
		user_password: userPass,
		user_telp: userTelp,
		user_type: userType,
		user_username: userUsername,
		user_register: userRegister
	});

	$('#editUserModal').modal('hide');

	// SHOW UPDATED DATA ON BROWSER
	$('tr[data-id=' + id + '] td.user_nama').html(userNama);
	$('tr[data-id=' + id + '] td.user_alamat').html(userAlamat);
	$('tr[data-id=' + id + '] td.user_email').html(userEmail);
	$('tr[data-id=' + id + '] td.user_img').html(filename);
	$('tr[data-id=' + id + '] td.user_password').html(userPass);
	$('tr[data-id=' + id + '] td.user_telp').html(userTelp);
	$('tr[data-id=' + id + '] td.user_type').html(userType);
	$('tr[data-id=' + id + '] td.user_username').html(userUsername);
	$('tr[data-id=' + id + '] td.user_register').html(userRegister);
});

/////////////////////
//DELETE
/////////////////////

	// DELETE EMPLOYEE
	$(document).on('click', '.js-delete-employee', function (e) {
		e.preventDefault();
		let id = $(this).attr('id');
		$('#delete-employee-form').attr('delete-id', id);
		$('#deleteEmployeeModal').modal('show');
	});

	$("#delete-employee-form").submit(function (event) {
		event.preventDefault();
		let id = $(this).attr('delete-id');
		if (id != undefined) {
			db.collection('employees').doc(id).delete()
				.then(function () {
					console.log("Document successfully delete!");
					$("#deleteEmployeeModal").modal('hide');
				})
				.catch(function (error) {
					console.error("Error deleting document: ", error);
				});
		} else {
			let checkbox = $('table tbody input:checked');
			checkbox.each(function () {
				db.collection('employees').doc(this.value).delete()
					.then(function () {
						console.log("Document successfully delete!");
						displayEmployees();
					})
					.catch(function (error) {
						console.error("Error deleting document: ", error);
					});
			});
			$("#deleteEmployeeModal").modal('hide');
		}
	});

	// DELETE KATEGORI
	$(document).on('click', '.js-delete-kategori', function (e) {
		e.preventDefault();
		let id = $(this).attr('id');
		$('#delete-kategori-form').attr('delete-id', id);
		$('#deleteKategoriModal').modal('show');
	});

	$("#delete-kategori-form").submit(function (event) {
		event.preventDefault();
		let id = $(this).attr('delete-id');
		if (id != undefined) {
			db.collection('kategori').doc(id).delete()
				.then(function () {
					console.log("Document successfully delete!");
					$("#deleteKategoriModal").modal('hide');
				})
				.catch(function (error) {
					console.error("Error deleting document: ", error);
				});
		} else {
			let checkbox = $('table tbody input:checked');
			checkbox.each(function () {
				db.collection('kategori').doc(this.value).delete()
					.then(function () {
						console.log("Document successfully delete!");
						displayKategori();
					})
					.catch(function (error) {
						console.error("Error deleting document: ", error);
					});
			});
			$("#deleteKategoriModal").modal('hide');
		}
	});
	// DELETE MENU
	$(document).on('click', '.js-delete-menu', function (e) {
		e.preventDefault();
		let id = $(this).attr('id');
		$('#delete-menu-form').attr('delete-id', id);
		$('#deleteMenuModal').modal('show');
	});

	$("#delete-menu-form").submit(function (event) {
		event.preventDefault();
		let id = $(this).attr('delete-id');
		if (id != undefined) {
			db.collection('menu').doc(id).delete()
				.then(function () {
					console.log("Document successfully delete!");
					$("#deleteMenuModal").modal('hide');
				})
				.catch(function (error) {
					console.error("Error deleting document: ", error);
				});
		} else {
			let checkbox = $('table tbody input:checked');
			checkbox.each(function () {
				db.collection('menu').doc(this.value).delete()
					.then(function () {
						console.log("Document successfully delete!");
						displayMenu();
					})
					.catch(function (error) {
						console.error("Error deleting document: ", error);
					});
			});
			$("#deleteMenuModal").modal('hide');
		}
	});

	// DELETE TEMPAT
	$(document).on('click', '.js-delete-tempat', function (e) {
		e.preventDefault();
		let id = $(this).attr('id');
		$('#delete-tempat-form').attr('delete-id', id);
		$('#deleteTempatModal').modal('show');
	});

	$("#delete-tempat-form").submit(function (event) {
		event.preventDefault();
		let id = $(this).attr('delete-id');
		if (id != undefined) {
			db.collection('tempat').doc(id).delete()
				.then(function () {
					console.log("Document successfully delete!");
					$("#deleteTempatModal").modal('hide');
				})
				.catch(function (error) {
					console.error("Error deleting document: ", error);
				});
		} else {
			let checkbox = $('table tbody input:checked');
			checkbox.each(function () {
				db.collection('tempat').doc(this.value).delete()
					.then(function () {
						console.log("Document successfully delete!");
						displayTempat();
					})
					.catch(function (error) {
						console.error("Error deleting document: ", error);
					});
			});
			$("#deleteTempatModal").modal('hide');
		}
	});

	// DELETE USER
	$(document).on('click', '.js-delete-user', function (e) {
		e.preventDefault();
		let id = $(this).attr('id');
		$('#delete-user-form').attr('delete-id', id);
		$('#deleteUserModal').modal('show');
	});

	$("#delete-user-form").submit(function (event) {
		event.preventDefault();
		let id = $(this).attr('delete-id');
		if (id != undefined) {
			db.collection('users').doc(id).delete()
				.then(function () {
					console.log("Document successfully deleted!");//kesini tpi ngga kerefresh???
					$("#deleteUserModal").modal('hide');
				})
				.catch(function (error) {
					console.error("Error deleting document: ", error);
				});
		} else {
			let checkbox = $('table tbody input:checked');
			checkbox.each(function () {
				db.collection('users').doc(this.value).delete()
					.then(function () {
						console.log("Document successfully delete!");
						displayUser();
					})
					.catch(function (error) {
						console.error("Error deleting document: ", error);
					});
			});
			$("#deleteUserModal").modal('hide');
		}
	});

	// SEARCH
	$("#search-name").keyup(function () {
		$('#employee-table tbody').html('');
		let nameKeyword = $("#search-name").val();
		console.log(nameKeyword);
		employeeRef.orderBy('name', 'asc').startAt(nameKeyword).endAt(nameKeyword + "\uf8ff").get()
			.then(function (documentSnapshots) {
				documentSnapshots.docs.forEach(doc => {
					renderEmployee(doc);
				});
			});
	});

	// RESET FORMS
	$("#addEmployeeModal").on('hidden.bs.modal', function () {
		$('#add-employee-form .form-control').val('');
	});

	$("#editEmployeeModal").on('hidden.bs.modal', function () {
		$('#edit-employee-form .form-control').val('');
	});

	$("#addKategoriModal").on('hidden.bs.modal', function () {
		$('#add-kategori-form .form-control').val('');
	});

	$("#editKategoriModal").on('hidden.bs.modal', function () {
		$('#edit-kategori-form .form-control').val('');
	});

	$("#addMenuModal").on('hidden.bs.modal', function () {
		$('#add-menu-form .form-control').val('');
	});

	$("#editMenuModal").on('hidden.bs.modal', function () {
		$('#edit-menu-form .form-control').val('');
	});
	
	$("#addTempatModal").on('hidden.bs.modal', function () {
		$('#add-tempat-form .form-control').val('');
	});

	$("#editTempatModal").on('hidden.bs.modal', function () {
		$('#edit-tempat-form .form-control').val('');
	});
	
	$("#addUserModal").on('hidden.bs.modal', function () {
		$('#add-user-form .form-control').val('');
	});

	$("#editUserModal").on('hidden.bs.modal', function () {
		$('#edit-user-form .form-control').val('');
	});
});

// CENTER MODAL
(function ($) {
	"use strict";

	function centerModal() {
		$(this).css('display', 'block');
		var $dialog = $(this).find(".modal-dialog"),
			offset = ($(window).height() - $dialog.height()) / 2,
			bottomMargin = parseInt($dialog.css('marginBottom'), 10);

		// Make sure you don't hide the top part of the modal w/ a negative margin if it's longer than the screen height, and keep the margin equal to the bottom margin of the modal
		if (offset < bottomMargin) offset = bottomMargin;
		$dialog.css("margin-top", offset);
	}

	$(document).on('show.bs.modal', '.modal', centerModal);
	$(window).on("resize", function () {
		$('.modal:visible').each(centerModal);
	});
}(jQuery));