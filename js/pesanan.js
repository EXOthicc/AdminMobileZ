var idAdmin;
var idIsian;
var idKurir;
var sudahkah = false;

function tes(idTes, idTis){
    $('#pilihDriverModal').modal('show');
    idAdmin = idTes
    idIsian = idTis;
    if(sudahkah == false){
        isiDriver();
    }
    sudahkah = true;
}

function submitDriver(idAdminX, idDriverX){
    idAdmin = idAdminX;
    idKurir = idDriverX;
    console.log('idAdmin', idAdmin);
	console.log('idIsian', idIsian);
    console.log('idDriver', idKurir);

    //flag last disini
    //update db
    db.collection('users').doc(idAdmin).collection('pesanan').doc(idIsian).update({
        pesanan_driver: idKurir
    });
}

function XXX(t){
    console.log('SAD', t);
}

$(document).ready(function(){
    console.log("DDREADY");

    $("select.kurirX").change (function () {
        idKurir = $(this).children("option:selected").val();  
        //alert ("You have selected the country - " + selectedCountry);  
        });

    let SubBtn = ///
    `
    <button onclick="submitDriver(idAdmin, idKurir)">SUBMIT</button>
    `
    $('#XSubBtn').append(SubBtn);
})

const isiDriver = async (doc) => {
    console.log("ISI DRIVER");
    $('#ngisi').slice(0).remove();//!!
    const isi = await db.collection('users').get();
		console.log("ISISSISII", isi.docs);
		isi.docs.forEach(async is =>{
			const kurr = is.data();
			//console.log(kurr);
			if(kurr.user_type == 'driver'){
				console.log(is.id);
				let isian =`
				<option id="ngisi" value="${is.id}">${kurr.user_nama}</option>
				`
				console.log(isian);//disini ada, rtapi kalo dikluarin dari } bawah ngga muncul
				$('#Xpesanan_kurir').append(isian);
			}
		});
}