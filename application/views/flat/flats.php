<?php include_once(APPPATH . "views/includes/header.php"); ?>
<style>
.custom-tooltip {
    position: relative;
    display: inline-block;
}

.custom-tooltip .tooltip-content {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: 110%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    transition: opacity 0.3s, visibility 0.3s;
}

.custom-tooltip:hover .tooltip-content {
    visibility: visible;
    opacity: 1;
}
</style>
<script>
$(function() {
    $('[data-toggle="tooltip"]').tooltip()
})
</script>

<body id="page-top">
    <!-- Page Wrapper -->
    <div id="wrapper">
        <!-- Sidebar -->
        <?php include_once(APPPATH . "views/includes/sidebar.php"); ?>
        <!-- End of Sidebar -->
        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">
            <!-- Main Content -->
            <div id="content">
                <!-- <?php print_r($users); ?> -->
                <!-- Topbar -->
                <?php include_once(APPPATH . "views/includes/navbar.php"); ?>
                <!-- End of Topbar -->
                <!-- Begin Page Content -->
                <div class="container-fluid">
                    <!-- Page Heading -->
                    <div class="d-sm-flex align-items-center justify-content-between mb-2">
                        <h1 class="h3 mb-0 text-gray-800">Flats Available</h1>
                        <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
                    </div>
                    <div class="row">

                        <?php foreach ($flats as $flat) { ?>
                        <div class="col-xl-4 col-md-6 mb-4 " id='<?php echo "flat_" . $flat['flat_id']; ?>'>
                            <div class="card border-left-primary shadow h-100 py-4">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                <?php if ($flat['type'] == 'A') {
														echo "Luxary Flat";
													} else {
														echo "Normal Flat";
													} ?></div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800"><?php if (isset($flat['rent'])) {
																										echo $flat['rent'];
																									} else {
																										echo "--";
																									} ?></div>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800">
                                                <?php
													if (isset($flat['status']) && $flat['status'] == '1') {
														echo 'Available';
													}
													?>
                                            </div>
                                        </div>
                                        <div class="col-auto" data-toggle="tooltip" data-placement="top"
                                            title="Book Now">
                                            <!-- -->
                                            <button id='<?php echo "flat_" . $flat['flat_id']; ?>' type="button"
                                                class="select-flat flat btn btn-primary btn-sm rounded-circle tooltip-content"
                                                data-toggle="modal" data-name='<?php if ($flat['type'] == 'A') {
																																																										echo "Luxary Flat";
																																																									} else {
																																																										echo "Normal Flat";
																																																									}  ?>' data-price='<?php echo $flat['rent']; ?>'
                                                data-user='<?php print_r($_SESSION['user_id']); ?>'>
                                                <i class="fas fa-calendar fa-2x text-gray-300"></i>
                                            </button>
                                            <!-- <i class="fa-brands fa-flickr"></i> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <?php } ?>
                    </div>
                </div>
                <!-- /.container-fluid -->
            </div>
            <!-- End of Main Content -->
            <!-- Footer -->
            <footer class="sticky-footer bg-white">
                <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>Copyright &copy; Your Website 2021</span>
                    </div>
                </div>
            </footer>
            <!-- End of Footer -->
        </div>
        <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->
    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>
    <!-- Alert Modal-->

    <div class="modal fade" id="flatModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Book This Flat</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <!-- Use a placeholder element to dynamically set the modal content -->
                <div class="modal-body" id="flatmodalContent"></div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a class="btn btn-primary" id="flatBookButton" href="#">Book</a>
                </div>
            </div>
        </div>
    </div>
    <script>
    $(document).ready(function() {

        var clickedElementId;
        var user = <?php echo $_SESSION['user_id'] ?>;
        $('.select-flat').on('click', function() {
            console.log('asd')
            // Use the 'this' keyword to reference the clicked element

            if ($(this).hasClass('flat')) {
                // Use the 'this' keyword to reference the clicked element
                clickedElementId = $(this).attr('id');
                var faltName = $(this).attr('data-name');

                var price = $(this).attr('data-price');

                // Set the modal content dynamically
                $('#flatmodalContent').text('Do You want to book flat: ' + faltName + ' of rent :' +
                    price);

                // Show the modal
                $('#flatModal').modal('show');
            }
        });
        // Attach a function to the click event of the element with ID "flatBookButton"
        $('#flatBookButton').on('click', function() {
            // Add your custom function logic here
            console.log('Logout button clicked for element with ID:', clickedElementId);
            var extractedValue = clickedElementId.split('flat_')[1];
            var userName = $(this).attr('data-user');
            // Close the modal	
            bookFlat(extractedValue)
            // $('#flatModal').modal('hide');
        });

        function bookFlat(flatId) {
            $('#flatModal').modal('hide');

            var formData = {
                flatId: flatId,
                userId: user,
            }
            $.ajax({
                type: 'POST',
                url: '<?php echo base_url(); ?>register_flat',
                data: formData,
                success: function(response) {
                    // Handle successful submission (you can redirect or show a success message)
                    swal("Flat Registered!", "Flat Registered Successfully!", "success");


                },
                error: function(xhr, status, error) {


                    swal("Oops!", "Something went wrong", "error");



                    var errors = JSON.parse(xhr.responseText);

                    $('.error-message').html('');

                    // Display errors for each field
                    $.each(errors, function(key, value) {
                        $('#' + key).next('.error-message').html(
                            '<span class="text-danger">' + value + '</span>');
                    });
                }
            });
        }


    });
    </script>







































    <?php include_once(APPPATH . "views/includes/footer.php"); ?>