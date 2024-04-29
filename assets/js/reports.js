function load_reports(data) {
	let flats = data.booking;
	let res = '	<div class="card-body p-0">';
	res += '		<div class="row">';
	res += '			<div class="h-100 w-100">';
	res += '				<div class="card shadow mb-4 h-4 p-2">';
	res += '					<div class="form-row">'; 
	res += '						<div class="form-group col-md-2">';
	res += '							<label for="flatNameInput">Start Date</label>';
	res += '							    <input data-provide="datepicker" type="text" name="start_date" autocomplete="off" value="" class="form-control form-control-user" id="start_date_datepicker" aria-describedby="start_dateHelp" placeholder="Select Start Date...">	';
	res += '							<span class="error-message" id="start_date_error"></span>';
	res += '							<span class="error-message" ></span>';
	res += '						</div >';
	res += '						<div class="form-group col-md-2">';
	res += '							<label for="flatNameInput">End Date</label>';
	res += '							    <input data-provide="datepicker" type="text" name="end_date" autocomplete="off" value="" class="form-control form-control-user" id="end_date_datepicker" aria-describedby="end_dateHelp" placeholder="Select End Date...">	';
	res += '							<span class="error-message" id="end_date_error"></span>';
	res += '							<span class="error-message" ></span>';
	res += '						</div >';
	res += '						<div class="form-group col-md-2">';
	res += '							<label for="flatNameInput">Name</label>';
	res += '							<input type="text" name="name" value="" class="form-control form-control-user" autocomplete="off" id="name" aria-describedby="nameHelp" placeholder="Enter First Name...">';
	res += '							<span class="error-message" id="name_error"></span>';
	res += '							<span class="error-message" ></span>';
	res += '						</div >';
	res += '						<div class="form-group col-md-2">'
	res += '							<label for="benefitsCheckbox">Report</label>'
										+'<select class="form-select  " id="report" name="report">'
											+'<option value="">Select Type</option>'
											+'<option value="tower_report">Tower Report</option>'
											+ '<option value="user_report">User Report</option>'
											+'<option value="flat_report">Flat Report</option>' 
											+'<option value="rent_report">Rent Report</option>' 
										+'</select><span class="error-message" id="report_type_error"></span>'
		res += 						'</div>';
		res += 						'<div class="form-group col-md-4"><label for="benefitsCheckbox">Search</label>'
									+'<button name="report_search" id="report_search"  class="btn btn-primary btn-user btn-block ">'
										+'Search</button> ';
									+'</div>';
	
	  res += 					'</div ><hr/>';
	  res += 					'<div class="table-responsive" id="report_table">';
	  res += 					`<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
									<thead>
										 
									</thead>
									<tfoot>
										
									</tfoot>
									<tbody></tbody>`;
	  res += 					'</div >';
	  res += 				'</div >';
	  res += 			'</div >';
	  res += 		'</div >';
	  
	  res += 	'</div >';
	  res += '</div >';
	  $(".user_dash").html("");
	  // Append table header to thead
  
	$(".user_dash").html(res);

	$("#report_search").on("click", function () {
		let tableHeadFoot='';
		let tableHeader=`<tr id='tbl_head'>
		<th>#</th>`;
		let tableFooter=`<tr>
		<th>#</th>`
		 let start_date = $("#start_date_datepicker").val();
		 let end_date = $("#end_date_datepicker").val();
		 let name = $("#name").val();
		 let report = $("#report").val();
		 $("#start_date_error").text("");
		 $("#end_date_error").text("");
		 $("#report_type_error").text("");
		 if(start_date == ""){
			 $("#start_date_error").text("Select Start Date");
		 } 
		 if(end_date == ""){
			 $("#end_date_error").text("Select End Date");
		 } 
		 if(report == ""){
			 $("#report_type_error").text("Select Report Type");
		 }
		 if(start_date == ""|| end_date == "" || report == ""){
			 return;
		 } 
		 
		 if(report=='tower_report'){
			
			// Define table footer content
				tableHeadFoot += `<th>Tower Name</th>`;	
				tableHeadFoot += `<th>Owner Name</th>`;	
				tableHeadFoot += `<th>Total Flats</th>`;	
				tableHeadFoot += `<th>Revenue</th>`;	
				tableHeadFoot += `<th>Register Date</th>`;	
				tableHeadFoot += `<th>Options</th>`;	
  
		 }if(report=='flat_report'){
			tableHeadFoot+=`<th>Flat Name</th><th>Owner Name</th><th>Status</th><th>Rent</th><th>Type</th><th>Worker</th><th>Option</th>`
		 }if(report=='user_report'){
			tableHeadFoot+=`<th>User Name</th>`
			tableHeadFoot+=`<th>Email</th>`
			tableHeadFoot+=`<th>Contact No</th>`
			tableHeadFoot+=`<th>Type</th>`
			tableHeadFoot+=`<th>Options</th>`
		 }if(report=='rent_report'){
			tableHeadFoot+=`<th>Rental Name</th>`
			tableHeadFoot+=`<th>Flat Name</th>`
			tableHeadFoot+=`<th>Tower Name</th>`
			tableHeadFoot+=`<th>Flat Type</th>`
			tableHeadFoot+=`<th>Room Fare</th>`
			tableHeadFoot+=`<th>Rent Charged</th>`
			tableHeadFoot+=`<th>Rent Days</th>` 
			tableHeadFoot+=`<th>Status</th>`
		 }
		 tableHeadFoot+=`
					</tr>`
		 $('table tfoot').html("")
		 $('table thead').html("")
		
		
	  // Append table footer to tfoot
	//   let tblRows='<tr><td>1</td><td>asds</td><td>opt</td></tr>'
	//   $('table tbody').append(tblRows);
	$(".loader").show();
	if($('table thead').html()==''){
		$('table thead').append(tableHeader+tableHeadFoot);
	}
	$.get('report', { type: report,start_date: start_date, end_date: end_date, name: name }, function (data, status) {
		$(".loader").hide();
				let data1 = JSON.parse(data);
				 
				if(data1.report&&data1.report.length>0){
				let tr='';
				data1.report.map((data,index)=>{
					if(report=='tower_report'){
						let owner = data.username||data.first_name+' '+data.last_name
						let earning = (data.tower_earning&&data.tower_earning!='')>0?data.tower_earning:0; 
						 tr +=`<tr></tr>
						<td>${index+1}</td>
						<td>${data.tower_name}</td>
						<td>${owner}</td>
						<td>${data.flat_total}</td>
						<td>${earning}</td>
						<td>${data.created_at}</td> `
						+
						`<td><a class='btn btn-info'  data-toggle="modal" data-target="#customModal"    onclick="return edit_tower_ajax('edit_tower_ajax',` +
						data.id +
						`,'modal')">Edit</a> <a class='btn btn-danger'  onclick="delete_tower(` +
						data.id +
						`,false)">Delete</a></td> ` +`</tr>` 
					} 
					if(report=='flat_report'){
						let selectEmployee = '<select class="form-control" name="worker_id" id="worker_id" onchange="return assignWorker(' + data.flat_id + ')"><option value="0">Select</option>';
						 data.worker.map((data2,index)=>{
							let selected=data2.user_id ==data.worker_id?'selected':''
							selectEmployee+=`<option value="${data2.user_id}" ${selected}>${data2.username||data2.first_name+' '+data2.last_name}</option>` 
						 })
						 selectEmployee+=`</select>`
						 console.log(selectEmployee)
						let owner = data.username||data.first_name+' '+data.last_name
							let earning = (data.flat_earning&&data.rent!='')>0?data.rent:0; 
							let status = (data.status=='1'?'Vacant':'Booked'); 
							let type = (data.type=='A'?'Five Star':'Normal'); 
							 tr +=`<tr></tr>
							<td>${index+1}</td>
							<td>${data.flat_name}</td>
							<td>${owner}</td> 
							<td>${status}</td> 
							<td>${earning}</td>
							<td>${type}</td>
							<td>${selectEmployee}</td>
						 
							<td><a class='btn btn-info'  data-toggle="modal" data-target="#customModal"    onclick="return edit_flat('edit_flat_ajax',` +
							data.flat_id +
							`,'modal')">Edit</a> <a class='btn btn-danger'  onclick="delete_flat(` +
							data.flat_id +
							`,false)">Delete</a></td></tr>`;
						
						}
					if(report=='user_report'){
						let username = data.username||data.first_name+' '+data.last_name
						let role = selectUserRole(data.type);
							tr +=`<tr></tr>
							<td>${index+1}</td>
							<td>${username}</td> 
							<td>${data.email}</td>
							<td>${data.contact_no}</td>  
							<td>${role}</td>  
							<td> <a class='btn btn-info'  data-toggle="modal" data-target="#customModal"  onclick="return edit_employee(` +
							data.user_id +
							`,'modal')">Edit</a> <a class='btn btn-danger'  onclick="delete_employee(` +
							data.user_id +
							`,false)">Delete</a></td> ` +`</tr>` ;
			
					}
					if(report=='rent_report'){
						let timeDiff = getDateDifference(data.created_at, data.updated_at)
						let totalDays = getCurrentMonthDays()
						let charged= Math.round(data.amount*(timeDiff.days/30) )
						if(isNaN(charged) || charged =='Infinity'){charged=0}
						let username = data.username||data.first_name+' '+data.last_name
						let flat_type = data.flat_type=='A'?'Luxury':'Normal'
						let selectEmployee = '<select class="form-control" name="assign_worker_id" id="assign_worker_id" onchange="return assignWorkerMap(' + data.id + ')"><option value="">Select</option>';
						 data.worker.map((data2,index)=>{
							let selected=data2.user_id ==data.worker_id?'selected':''
							selectEmployee+=`<option value="${data2.user_id}" ${selected}>${data2.username||data2.first_name+' '+data2.last_name}</option>` 
						 })
						 selectEmployee+=`</select>`
						 console.log(selectEmployee)
						let paid = data.paid=='yes'?'Paid':`<a   data-toggle="modal" data-target="#customModal"  onclick='return assignServices(${data.flat_id},${data.id},${charged},${data.services})' class="btn btn-primary">Assign Services</a> <a onclick="return checkout(${data.flat_id},${data.id},${charged})" class="btn btn-info">Pay</a>` 
							 tr +=`<tr></tr>
							<td>${index+1}</td>
							<td>${username}</td> 
							<td>${data.flat_name}</td>  
							<td>${data.tower_name}</td>  
							<td>${flat_type}</td>  
							<td>${data.amount}</td>
							<td>${charged}</td>
							<td>${timeDiff.days}</td> 
							<td>${paid}</td>  
							</tr>` ;
						
						}
				}) 
					$('table tbody').html('');
					$('table tbody').append(tr);
					 
					// $('table tfoot').append(tableFooter+tableHeadFoot);
				}
				else{
					$('table tbody').html('');
					$('table tbody').append(`<tr>No Data Found</tr>`);

				}
				if(data1.status==0){
					
					$('table tbody').html('');
					$('table tbody').append(`<tr>No Data Found</tr>`);
					// showError(data1.errors);
					swal(data1.errors + "!", data1.errors, "error");
					console.log(data1.errors)
					return
				}
				
				if (data1.status == "error") {
					console.log(data1.errors)
				}
				if (data1.status == "success") {
					swal(data1.message + "!", data1.message, "success");
				}
				// $(".user_dash").html("");
				// get_towers_ajax(data1);
			});
		}) 
} 

function checkout(flat_id,rent_id,rent_charged='') {
	$(".loader").show();
	const obj_checkOut = rent_id?{ id: flat_id,rent_id:rent_id,rent_charged }:{ id: flat_id }
	$.get("checkout_ajax", obj_checkOut, function (data, status) {
		$(".loader").hide();
		let data1 = JSON.parse(data);
		console.log(data1);
		if (data1.status == "error") {
			showError(data1.errors);
		}
		if (data1.status == "success") {
			swal(data1.message + "!", data1.message, "success");
		}
		// $(".user_dash").html("");
		get_towers_ajax(data1);
	});
}
const assignWorker = (flat_id) => { 
	var worker_id = document.getElementById("worker_id").value;
	console.log(worker_id);
	$(".loader").show();
	$.get("assign_worker_ajax", { flat_id: flat_id, worker_id: worker_id }, function (data, status) {
		$(".loader").hide();
		let data1 = JSON.parse(data);
		console.log(data1);
		if (data1.status == "error") {
			showError(data1.errors);
		}
		if (data1.status == "success") {
			swal(data1.message + "!", data1.message, "success");
		}
		// $(".user_dash").html("");
		// get_towers_ajax(data1);
	});
} 
const assignWorkerMap = (rent_id) => { 
    var worker_id = document.getElementById('assign_worker_id').value;
	 
	 
	$(".loader").show();
	$.get("assign_worker_ajax", { rent_id: rent_id, worker_id: worker_id, assign_type: 'rent' }, function (data, status) {
		$(".loader").hide();
		let data1 = JSON.parse(data);
		console.log(data1);
		if (data1.status == "error") {
			showError(data1.errors);
		}
		if (data1.status == "success") {
			swal(data1.message + "!", data1.message, "success");
		}
		// $(".user_dash").html("");
		// get_towers_ajax(data1);
	});
}

const assignServices = (flat_id,rent_id,rent_charged,services) => {
    console.log(flat_id)
    console.log(rent_id)
    console.log(rent_charged) 
	console.log(services.sweeper_id)
	let sweeper_id = services.sweeper_id||'';
	let watchman_id = services.watchman_id||''; 
	let select_sweeper='<select class="form-control" name="sweeper_id" id="sweeper_id" ><option value="">Select Sweeper</option>';

	let select_watchman='<select class="form-control" name="watchman_id" id="watchman_id" ><option value="">Select watchman</option>';
		
	$.get("get_service_data", { rent_id: rent_id, flat_id: flat_id, assign_type: 'service' }, function (data, status) {
		$(".loader").show();
		let data1 = JSON.parse(data);
		
		const {sweeper,service_data,watchman} = data1 
		  
		// if (data1.status == "error") {
		// 	showError(data1.errors);
		// }
		// if (data1.status == "success") {
		// 	swal(data1.message + "!", data1.message, "success");
		// }
		// $(".user_dash").html("");
		// get_towers_ajax(data1);
		const {sweeper_select,watchman_select} =assignServiceSelect(data1.sweeper,data1.watchman,sweeper_id,watchman_id) 
	
	 
		$("#customModalLabel").html('');
		$(".modal-body").html('');
		$("#customModalLabel").html('Assign Services'); 
		$(".loader").hide();
		$(".modal-body").html(service_assign_html(sweeper_select,watchman_select,rent_id));
		
	});
}

var bill_val='';
function service_assign_html(
	sweeper_select,watchman_select,rent_id='',
    data = "",
    route = "register_flat_ajax"
) {
    let flat_id = data?.flat_id || "false";
    let flat_name = data?.flat_name || "";
    let type = data?.type || "";
    let rent = data?.rent || "";
    let status = data?.status || "";
	let bill=0

    return (
        `<div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">
        <!-- Nested Row within Card Body -->
        <div class="row">
            <!-- <div class="col-lg-6 d-none d-lg-block bg-login-image"></div> -->
            <div class="col-lg-12">
                <div class="p-5">
                    <form class="user" method="post" id="assign_service_form"  onsubmit="return preventAssignService()">
                        <div class="form-row">
 
						<div class="form-group col-md-6" id='sweeper_div'>
						<label for="sweeperSelect">Sweeper</label>
						<input type="hidden" style="display:none" name='rent_id' id='rent_id' value="${rent_id}"/>
                                ${sweeper_select}
                            </div>

                            <div class="form-group col-md-6" id='watchman_div'>
                                <label for="watchmanSelect">Watchman</label>
                                ${watchman_select}
                            </div>

                            

                            <div class="form-group col-md-6">
                                <label for="billInput">Bill</label>
                                <input type="text" value="${bill}" name="bill" onkeyup="assign_bill(this.value,'bill_val')" class="form-control form-control-user" id="bill" placeholder="Bill">
                                <span class="error-message" id="bill_error"></span>
                            </div>
                        </div>

                        <div class="form-row">
                            ${button("save", "primary", "Save")}
                            ${button("cancel", "danger", "Cancel")}
                        </div>
                    </form>
                    <hr>
                </div>
            </div>
        </div>
        </div>
        </div>`
    );
    // response += `</div> `;
}
var watchman_var='';
var sweeper_var='';
function assignServiceSelect(sweeper,watchman,sweeper_id,watchman_id){
	let sweeper_select = "";
	let watchman_select = "";
	if(sweeper){
		sweeper_select += `<select class="form-control" name="sweeper_id" id="sweeper_id" onchange="assign_sweeper(this.value,'sweeper_var')"><option value="">Select sweeper</option>`;
		sweeper.map((sweeper,index) => {
			let selected = sweeper.user_id==sweeper_id?'selected':''
			sweeper_select +=`<option value="${sweeper.user_id}" ${selected}>${sweeper.username}</option>`
		})
		sweeper_select += `</select>`;
	}
	if(watchman){
		watchman_select += `<select class="form-control" name="watchman_id" id="watchman_id" onchange="assign_watchman(this.value,'watchman_var')"><option value="">Select watchman</option>`;
		watchman.map((watchman,index) => {
			let selected = watchman.user_id==watchman_id?'selected':''
			watchman_select +=`<option value="${watchman.user_id}" ${selected}>${watchman.username}</option>`
		})
		watchman_select += `</select>`;
	}
	return {
		sweeper_select,
		watchman_select
	}
}
document.getElementById('assign_service_form').onsubmit = function() {
    // Your logic to handle form submission prevention
	console.log('test')
    return false;
};
function assign_sweeper(val,variable){
	sweeper_var = val;
	 
}
function assign_watchman(val,variable){
	watchman_var = val;
	 
}
function assign_bill(val,variable){
	bill_val = val;
	 
}
function preventAssignService(){
	console.log(watchman_var)
	console.log(bill_val)
	console.log(sweeper_var)  
	let rent_id = $("#rent_id").val();
	
	$.post("assign_service_val_ajax", { watchman_id: watchman_var, sweeper_id: sweeper_var, bill_val: bill_val, rent_id: rent_id, assign_type: 'rent' }, function (data, status) {
		$(".loader").hide();
		let data1 = JSON.parse(data);
		console.log(data1);
		if (data1.status == "error") {
			showError(data1.errors);
		}
		if (data1.status == "success") {
			swal(data1.message + "!", data1.message, "success");
		}
		
		$("#customModalLabel").html('');
		$(".modal-body").html('');
		$("#customModal").modal("hide");
		// $(".user_dash").html("");
		// get_towers_ajax(data1);
	});
	return false;
}
