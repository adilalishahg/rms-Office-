<?php
// application/models/Your_model.php

class Db_Model extends CI_Model
{

	public function booking_detail($user, $where = '')
	{
		if ($where) {


			$this->db->where($where);
		}
		$this->db->select(TBL_RENT . '.*');
		$this->db->select(TBL_FLAT . '.*');
		// $this->db->join(TBL_FLAT, TBL_FLAT . '.flat_id =' . TBL_RENT . ' .flat_id', 'left');
		$this->db->join(TBL_USER, TBL_RENT . '.tenant_id =' . TBL_USER . ' .user_id', 'left');
		$this->db->join(TBL_FLAT, TBL_RENT . '.flat_id =' . TBL_FLAT . ' .flat_id', 'left');
		$get = $this->db->get(TBL_RENT);

		$query = $this->db->last_query();
		// echo $query;
		return ($get->result_array());
	}
	public function get_booked_flat_by_user($where = '')
	{

		// Your SQL query using the Query Builder
		// $this->db->select(TBL_RENT . '.*,' . TBL_FLAT . ' .*');
		// $this->db->from(TBL_RENT);
		// $this->db->join(TBL_FLAT, TBL_FLAT . '.flat_id = ' . TBL_RENT . '.flat_id', 'left');
		// $this->db->where($where);

		// Your SQL query using the Query Builder
		$this->db->select('COUNT(' . TBL_RENT . '.id) as booked');
		// $this->db->select('COUNT(monthly_rent.id) as booked');
		$this->db->from(TBL_RENT);
		// $this->db->from('monthly_rent');
		// $this->db->join('tbl_flats', 'tbl_flats.flat_id = monthly_rent.flat_id', 'left');
		$this->db->join(TBL_FLAT, TBL_FLAT . '.flat_id = ' . TBL_RENT . '.flat_id', 'left');
		// $this->db->where('tbl_flats.owner_id', 27);
		$this->db->where(TBL_FLAT . '.owner_id', $_SESSION['user_id']);
		$get = $this->db->get();


		// $this->db->select(TBL_RENT . '.* ,' . TBL_FLAT . '.* ');
		// $this->db->from(TBL_RENT);
		// $this->db->join(TBL_FLAT, TBL_FLAT . '.flat_id = ' . TBL_RENT . '.flat_id', 'left');
		// $this->db->where(TBL_FLAT . '.owner_id', $_SESSION['user_id']);
		// // $this->db->select(TBL_RENT . '.*');
		// // $this->db->select(TBL_FLAT . '.*');
		// // $this->db->join(TBL_RENT, TBL_FLAT . '.flat_id =' . TBL_RENT . ' .flat_id', 'left');
		// // $this->db->where($where);

		// $get = $this->db->get();
		// $query = $this->db->last_query();
		// echo $query;

		$result = ($get->result_array());


		// // Get the count of records
		// $count = $this->db->count_all_results('monthly_rent');

		return ['result' => $result[0]['booked']];
	}
	public function get_worker_with_type()
	{ 

		// Your SQL query using the Query Builder
		$this->db->select(TBL_USER . '.*,' . TBL_WORKER_TYPE . '.worker_salary,'. TBL_WORKER_TYPE . '.worker_type');
		$this->db->from(TBL_USER); 
		$this->db->join(TBL_WORKER_TYPE, TBL_USER . '.worker_type_id = ' . TBL_WORKER_TYPE . '.worker_type_id', 'left'); 
		$this->db->where(TBL_USER . '.worker_type_id!=','0');
		$get = $this->db->get(); 
		return ($get->result_array());
		// $query = $this->db->last_query(); 
 

		// return ['result' => $result];
	}
	public function get_booked_data($where = '')
	{
		$this->db->select('SUM(' . TBL_RENT . '.amount) as total');
		// $this->db->select('COUNT(monthly_rent.id) as booked');
		$this->db->from(TBL_RENT);
		// $this->db->from('monthly_rent');
		// $this->db->join('tbl_flats', 'tbl_flats.flat_id = monthly_rent.flat_id', 'left');
		$this->db->join(TBL_FLAT, TBL_FLAT . '.flat_id = ' . TBL_RENT . '.flat_id', 'left');
		// $this->db->where('tbl_flats.owner_id', 27);
		// print_r($_SESSION);
		if ($_SESSION['role'] != '1' && $_SESSION['role'] != '2' && $_SESSION['role'] != '4') {

			$this->db->where(TBL_FLAT . '.owner_id', $_SESSION['user_id']);
		}
		// if ($where) {
		// 	$this->db->where($where);
		// }
		$get = $this->db->get();
		// $query = $this->db->last_query();
		// print_r($query);
		// exit;



		$result = ($get->result_array());
		return ['result' => $result[0]['total']];
	}
	public function get_flat_and_tower()
	{
		$this->db->select(TBL_TOWER . '.tower_name,' . TBL_FLAT . '.*');
		// $this->db->select('COUNT(monthly_rent.id) as booked');
		$this->db->from(TBL_FLAT);
		// $this->db->from('monthly_rent');
		// $this->db->join('tbl_flats', 'tbl_flats.flat_id = monthly_rent.flat_id', 'left');
		$this->db->join(TBL_TOWER, TBL_FLAT . '.tower_id = ' . TBL_TOWER . '.id', 'left');
		// $this->db->where('tbl_flats.owner_id', 27);
		// print_r($_SESSION);
		if ($_SESSION['role'] != '1') {

			$this->db->where(TBL_FLAT . '.owner_id', $_SESSION['user_id']);
		}
		$get = $this->db->get();
		// $query = $this->db->last_query();
		// print_r($query);
		// exit;



		$result = ($get->result_array());
		return $result;
	}
	public function get_all_flat_and_tower($where='')
	{
		$this->db->select(TBL_TOWER . '.tower_name,' . TBL_FLAT . '.*,' . TBL_USER . '.*');
		// $this->db->select('COUNT(monthly_rent.id) as booked');
		$this->db->from(TBL_FLAT);
		// $this->db->from('monthly_rent');
		// $this->db->join('tbl_flats', 'tbl_flats.flat_id = monthly_rent.flat_id', 'left');
		$this->db->join(TBL_TOWER, TBL_FLAT . '.tower_id = ' . TBL_TOWER . '.id', 'left');
		$this->db->join(TBL_USER, TBL_FLAT . '.owner_id = ' . TBL_USER . '.user_id', 'left');
		// $this->db->where('tbl_flats.owner_id', 27);
		// print_r($_SESSION);
		if($where){

			$this->db->where($where);
		}
		// if ($_SESSION['role'] != '1') {

		// 	$this->db->where(TBL_FLAT . '.owner_id', $_SESSION['user_id']);
		// }
		$get = $this->db->get();
		// $query = $this->db->last_query();
		// print_r($query);
		// exit;



		$result = ($get->result_array());
		return $result;
	}
	public function get_data($table, $where = array(), $order_by = null, $limit = null, $type = 0, $select = '*')
	{
		$this->db->select($select);
		$this->db->from($table);

		if (!empty($where)) {
			$this->db->where($where);
		}

		if ($order_by) {
			$this->db->order_by($order_by);
		}

		if ($limit) {
			$this->db->limit($limit);
		}

		$query = $this->db->get();

		// $query = $this->db->last_query();
		// echo $query;
		if ($type == 1) {

			return ($query->result_array());
		}
		return $query->result();
	}
	public function getTowerReport($st_date, $en_date, $where=[],$table){
		$this->db->select($table.'.created_at,'.$table.'.tower_name,'.$table.'.id,'); 
		$this->db->select(TBL_USER.'.username,'.TBL_USER.'.first_name,'.TBL_USER.'.last_name,'.TBL_USER.'.email'); 
		$this->db->from($table);
		if($where){
			$this->db->group_start(); // Start grouping
			foreach ($where as $key => $value) {
				$this->db->or_like($key, $value);
			}
			$this->db->group_end(); // End grouping
		}
		
		$this->db->join(TBL_USER, TBL_USER . '.user_id = ' . $table . '.owner_id', 'left');
		$this->db->where($table.'.created_at >=', $st_date);
		$this->db->where($table.'.created_at <=', $en_date);
		$query = $this->db->get();
 
		  return 	$query->result_array();

	}
	public function getRentReport($st_date, $en_date, $where=[],$table){
		$this->db->select($table.'.*,'); 
		$this->db->select(TBL_FLAT.'.flat_name,'.TBL_FLAT.'.type as flat_type,'.TBL_FLAT.'.status as book_status,'); 
		$this->db->select(TBL_TOWER.'.tower_name,'); 
		$this->db->select(TBL_USER.'.first_name,'.TBL_USER.'.last_name,'.TBL_USER.'.username'); 
		$this->db->select(TBL_TW_MAP.'.worker_id'); 
		$this->db->from($table);
		if($where){
			$this->db->group_start(); // Start grouping
			foreach ($where as $key => $value) {
				$this->db->or_like($key, $value);
			}
			$this->db->group_end(); // End grouping
		}
		
		$this->db->join(TBL_USER, TBL_USER . '.user_id = ' . $table . '.tenant_id', 'left');
		$this->db->join(TBL_FLAT, TBL_FLAT . '.flat_id = ' . $table . '.flat_id', 'left');
		$this->db->join(TBL_TOWER, TBL_TOWER . '.id = ' . TBL_FLAT . '.tower_id', 'left');
		$this->db->join(TBL_TW_MAP, TBL_TW_MAP . '.rent_id = ' . $table . '.id', 'left'); 
		$this->db->where($table.'.created_at >=', $st_date);
		$this->db->where($table.'.created_at <=', $en_date);
		$query = $this->db->get();

		//  echo $query = $this->db->last_query();exit;
		  return 	$query->result_array();

	}
	public function getFlatsReport($st_date, $en_date, $where=[],$table){
		$this->db->select($table.'.*,'); 
		$this->db->select(TBL_USER.'.username,'.TBL_USER.'.first_name,'.TBL_USER.'.last_name,'.TBL_USER.'.email'); 
		$this->db->from($table);
		if($where){
			$this->db->group_start(); // Start grouping
			foreach ($where as $key => $value) {
				$this->db->or_like($key, $value);
			}
			$this->db->group_end(); // End grouping
		}
		
		$this->db->join(TBL_USER, TBL_USER . '.user_id = ' . $table . '.owner_id', 'left');
		$this->db->where($table.'.created_at >=', $st_date);
		$this->db->where($table.'.created_at <=', $en_date);
		$query = $this->db->get();

		  return 	$query->result_array();
		//  echo $query = $this->db->last_query();exit;

	}
	public function get_tower_revenue($where_flat='*',$table,$id,$type='tower'){
		$this->db->select($where_flat);
		$this->db->from($table);
		$this->db->join(TBL_FLAT, 'tbl_flats.flat_id = monthly_rent.flat_id', 'left');
		if($type=='tower'){
			$this->db->where('tbl_flats.tower_id', $id);
		}if($type=='flat'){
			$this->db->where('tbl_flats.flat_id', $id);

		}
 
		$query = $this->db->get();
		//  echo $query = $this->db->last_query();exit;
		$totalAmount =0;
		if ($query->num_rows() > 0) {
			$result = $query->row();
			$totalAmount = $result->total_amount; 
		} 
		return $totalAmount;
	}
	public function getCurrentUser($tbl, $array = array())
	{
		$this->db->select('*');
		$this->db->from($tbl);
		$this->db->where($array);
		$query = $this->db->get();
		return $query->row_array();
	}
	public function getHashedPassword($email = array(), $table)
	{
		// Query the database to get the hashed password based on email or username
		$this->db->select('password');  // Assuming the column name is 'password'
		$this->db->where($email); // Adjust based on your database schema
		// Or $this->db->where('username', $email);

		$query = $this->db->get($table);  // Assuming the table name is 'users'

		if ($query->num_rows() == 1) {
			$row = $query->row();
			return $row->password;
		} else {
			// Handle the case where the user is not found
			return null;
		}
	}
	public function insert_data($table, $data)
	{
		$this->db->insert($table, $data);
		return $this->db->insert_id();
	}

	public function update_data($table, $data, $where)
	{

		$this->db->update($table, $data, $where);
		// echo $this->db->last_query();exit;

		return $this->db->affected_rows();
	}

	public function delete_data($table, $where)
	{
		$this->db->delete($table, $where);
		return $this->db->affected_rows();
	}

	public function save_data($table, $data)
	{
		// Save user data to the database


		$this->db->insert($table, $data);

		// Return the inserted user ID
		return $this->db->insert_id();
	}
	public function is_email_unique($tbl, $email, $user_id)
	{
		$this->db->where('email', $email);
		$this->db->where('user_id !=', $user_id);
		$query = $this->db->get($tbl);
		if ($query->num_rows() > 0) {
			return false;
		} else {
			return true;
		}
	}
}
