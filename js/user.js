import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js';
import { 
  getAuth,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js';

export var XUser;

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAjMWj2li6n0ZM6SXfH1lXzSLq7sesO2ik",
    authDomain: "nangkring-bang.firebaseapp.com",
    projectId: "nangkring-bang",
    storageBucket: "nangkring-bang.appspot.com",
    messagingSenderId: "724512205413",
    appId: "1:724512205413:web:15d6d1e08675bcc3bdf48c",
    measurementId: "G-4FY8RW11ER"
});


var idDriverX;

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
let userRef = db.collection('users');
let deleteIDs = [];

var currUser;
var count = 0;
var fileitem;
var filename;

// REAL TIME LISTENER

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

userRef.onSnapshot(snapshot => {
	let size = snapshot.size;
	$('.userCount').text(size);
	if (size == 0) {
		$('#selectAll').attr('disabled', true);
	} else {
		$('#selectAll').attr('disabled', false);
	}
});


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
	//latestDoc = data.docs[data.docs.length - 1];

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
		
		let item =  //{}X1 di input id
		`<tr id="isian" data-id="${doc.id}">
        <form>
			<td class="pesanan_alamat">${pesanan.pesanan_alamat}</td>
			<td class="pesanan_bukti">${pesanan.pesanan_bukti}</td>
			<td class="pesanan_catatan">${pesanan.pesanan_catatan}</td>
			<td class="pesanan_metode">${pesanan.pesanan_metode}</td>
			<td class="pesanan_status">${pesanan.pesanan_status}</td>
			<td class="pesanan_sub">${pesanan.pesanan_sub}</td>
			<td class="pesanan_tgl_bayar">${tBayar.toDate()}</td>
			<td class="pesanan_tgl_order">${tOrder.toDate()}</td>			
			<td class="pesanan_ok" >
            <button admin="${$('#pesanan-user-form').attr('pesanan-id')}" id="ingput" name="${doc.id}" class="pesanan_ok js-pesanan-ok"  value="${doc.id}" onclick="tes('${$('#pesanan-user-form').attr('pesanan-id')}','${doc.id}')">Pilih Driver</button> 
            </td>
            </form>
		</tr>`;
		console.log('xoun', count);
		$('#pesanan-isi').append(item);

		//!!!disini harusnya masukin value ke tiap2 dropdown, ini malah di 1 dropdown paling atas doang 
		
		//
	})

	// UPDATE LATEST DOC
	//latestDoc = data.docs[data.docs.length - 1];

	// UNATTACH EVENT LISTENERS IF NO MORE DOCS
	if (data.empty) {
		$('.js-loadmore').hide();
	}
}

//

$(document).ready(function () {

	let latestDoc = null;

	// LOAD INITIAL DATA
	displayUser();

	// LOAD MORE
	$(document).on('click', '.js-loadmore', function () {
		displayUser(latestDoc);
	});

	

/////////////////////
//UPDATE
/////////////////////

	

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
$('#pilihDriverModal').modal('hide');
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

// PESANAN OK //(DRIVER BELUM DIPILIH, mau buat popup baru)
	$('#pesanan-user-form').submit(function(event){
		//evemt
		event.preventDefault(); //biar ngga ngerefresh
		let idAdmin = $('#pesanan-user-form').attr('pesanan-id');//id admin
		let idDriver = $(this.pesanan_kurir);//OKE//.attr('name');//id pesanan //!!!tapi cuma id pesanan yang paling atas doang yang masuk, pesanan dibawahnya ngga; karena array nama di array 0 doang yang kebaca; coba ke //{}X1
		console.log('idaa', idAdmin);//vf
		console.log('idbb', idIsian);//harusnya dari btn tar kirim Uidnya
        console.log('idcc', idDriverX);
		//console.log('idcc', idDriver);//vf
        $(idDriver).change(function(){
            idDriverX = $(this).val();
            console.log('idcc', idDriverX);  
        })

            //!![] harus klik ok dulu baru bisa baca value dropdown[]!!//


        /*
		db.collection('users').doc(idAdmin).collection('pesanan').doc(idPesanan).collection('pesanan_kurir').doc(idDriver).update({
			pesanan_driver: idDriver
		})
        */
	});//???

    //OOOO
    


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