function show_employees(rows) {
	var response =
		`<div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Employees </h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Contact</th>
                                            <th>Role</th>
                                            <th>option</th>
                                             
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Contact</th>
                                            <th>Role</th>
                                            <th>option</th>
                                             
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                       ` +
		rows +
		`
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div> `;
	$(".user_dash").html("");
	$(".user_dash").html(response);

	// Initialize DataTable after adding the HTML to the DOM
	$(document).ready(function () {
		$("#dataTable").DataTable();
	});
}function show_worker(rows) {
	console.log(rows)
	var response =
		`<div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Workers </h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Contact</th>
                                            <th>Role</th>
                                            <th>option</th>
                                             
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Contact</th>
                                            <th>Role</th>
                                            <th>option</th>
                                             
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                       ` +
		rows +
		`
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div> `;
	$(".user_dash").html("");
	$(".user_dash").html(response);

	// Initialize DataTable after adding the HTML to the DOM
	$(document).ready(function () {
		$("#dataTable").DataTable();
	});
}
function show_employees_type(rows) {
	var response =
		`<div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Employees </h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Worker</th>
                                            <th>Salary</th> 
                                            <th>option</th>
                                             
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>#</th>
                                            <th>Worker</th>
                                            <th>Salary</th> 
                                            <th>option</th>
                                             
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                       ` +
		rows +
		`
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div> `;
	$(".user_dash").html("");
	$(".user_dash").html(response);

	// Initialize DataTable after adding the HTML to the DOM
	$(document).ready(function () {
		$("#dataTable").DataTable();
	});
}
function add_empployee_type (data=''){
	  let input_field_hidden = data.worker_type_id?`<input type="hidden" name="worker_type_id" value="${data.worker_type_id}">`:``;
		var response =
			`<div class="card o-hidden border-0 shadow-lg my-5">
				<div class="card-body p-0">
					<!-- Nested Row within Card Body -->
					<div class="row">
						<!-- <div class="col-lg-6 d-none d-lg-block bg-login-image"></div> -->
						<div class="col-lg-12">
							<div class="p-5">
								<form  method='post' id="book_user_form_new"  onsubmit="return preventEmployeeTypeFormUser()">
									<div class	="form-row">
										` +input_field_hidden+
			
			input_field(
				(label = "Worker Type Name"),
				(type = "text"),
				(name = "worker_type_name"),
				(placeholder = "Enter Worker Type Name..."),
				value=data?.worker_type
			) +
			`
										` +
			input_field(
				(label = "Salary"),
				(type = "text"),
				(name = "salary"),
				(placeholder = "Enter Salary..."),
				value=data?.worker_salary
			)  +
			` 
								</div>
									<div class="form-row">
										<div class="form-group col-md-6">
											<button name="submit" value="save" class="btn btn-primary btn-user btn-block ">
												Save
											</button>
										</div>
										<div class="form-group col-md-6">
											<button name="submit" value="cancel" id="cancel" class="btn btn-danger btn-user btn-block ">
												Cancel
											</button>
										</div>
									</div>
								</form>
								<hr>
							</div>
						</div>
					</div>
				</div>
			</div>`;
		$(".user_dash").html("");
		$(".user_dash").html(response);
	 
}
function edit_employee_type(id){

	localStorage.setItem("route_selected", "edit_employee_type");
	localStorage.setItem("employee_type_id", id);
	const url = ajaxUrl + "worker_type_ajax";
	$.ajax({
		type: "GET",
		url: url, // Replace with your server endpoint
		data: {worker_type_edit_id:id},
		success: function (response) {
			let res = JSON.parse(response);
			console.log(res)
			// Handle the success response
			if (res.status == "error") {
				// console.log(res)
				// add_empployee_type(res.errors);
			}
			if (res.status == "success") {
				// swal(res.message + "!", res.message, "success");
				// document.getElementById("book_user_form_new").reset();
				add_empployee_type(res.worker_type)
			}
		},
		error: function (error) {
			// Handle the error
			console.log("Ajax request failed");
			console.log(error);
		},
	});
}
function preventEmployeeTypeFormUser(e){
	 
	// console.log("asd");
	var form = document.querySelector("form");$(".error-message").html("");
	$("#cancel").click(function () {
		document.getElementById("book_user_form_new").reset();
		$(".error-message").html("");
		return false;
	});
	const url = ajaxUrl + "worker_type_ajax";
	var formData = $("#book_user_form_new").serialize();
	$.ajax({
		type: "POST",
		url: url, // Replace with your server endpoint
		data: formData,
		success: function (response) {
			let res = JSON.parse(response);
			// Handle the success response
			if (res.status == "error") {
				// console.log(res)
				showError(res.errors);
			}
			if (res.status == "success") {
				swal(res.message + "!", res.message, "success");
				document.getElementById("book_user_form_new").reset();
			}
		},
		error: function (error) {
			// Handle the error
			console.log("Ajax request failed");
			console.log(error);
		},
	});
	return false;
 
}
function delete_employee_type (id){
	const url = ajaxUrl + "worker_type_ajax";
	$.ajax({
		type: "GET",
		url: url, // Replace with your server endpoint
		data: {del_id:id},
		success: function (response) {
			let res = JSON.parse(response);
			// Handle the success response
			if (res.status == "error") {
				// console.log(res)
				showError(res.errors);
			}
			if (res.status == "success") {
				swal(res.message + "!", res.message, "success"); 
			}
		},
		error: function (error) {
			// Handle the error
			console.log("Ajax request failed");
			console.log(error);
		},
	});
	return false;
}

const assignWorkerTypeMap = (worker_type,rent_id) => { 
    // var worker_type = document.getElementById('assign_worker_type').value;
	console.log(worker_type)
	 
	 
	$(".loader").show();
	$.get("assign_worker_type_ajax", { worker_id: rent_id, worker_type: worker_type }, function (data, status) {
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
function view_worker_detail(id){
	console.log(id)
}
