<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Open extends MY_Controller
{


	public function __construct()
	{

		parent::__construct();
	}
	public function index()
	{
		$this->load->view('open/index');
	}
}
