import logo from '/tasks.png'

function Notifications(title: string, body: string, silent?: true) {

  function show(){
		let options: {body: string, silent?: boolean, icon: string} = {
			body,
			icon: logo,
		};
		if(silent){
			options.silent = silent;
		}
		const Noti = new Notification(title, options)
	};

  if(Notification.permission === "granted"){
		show()
	}else if(Notification.permission !== 'denied'){
		Notification.requestPermission().then(Permission => {
			if(Permission === "granted"){
				show()
			}
		})
	}
}
export default Notifications;