module.exports = {
	
	checkUser: function(req, res){
		if(!req.session.me){
			console.log('You are NOT logged in');
			return res.view('login');
		} else {
			console.log('You are logged in');
			return res.view('dashboard');
		}
	}

};

