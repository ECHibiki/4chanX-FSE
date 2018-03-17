

class Main extends FeatureInterface{
	features:any = {};/*;any bypasses dot notation issues on objects*/
	settings:any = {};
	
	constructor(){
		super();
		if(!Generics.storageAvailable('localStorage')) {alert("4F-FSE: local storage error"); return;}
		else this.activate();	
		this.retrieveStates();
		this.init();
		this.decideAction(document.getElementById('delform'));
		this.observeEvents();
	}
	

	retrieveStates(){
		var top_bar = new TopBar();	
		top_bar.build();
		this.settings = top_bar.getSettingsArr();
	}
	
	init():void{	
		if(true){
			this.features.image_hider = new ImageHider();
		}
		if(true){
			this.features.text_replacer = new TextReplacer();
		}
		if(true){
			this.features.danbooru_image_adder = new DanbooruImageAdder();
		}
		if(true){
			this.features.thread_rebuilder = new ThreadRebuilder();
		}
		if(true || true){
			this.features.character_inserter = new CharacterInserter(true, true);
		}
		if(this.settings.password_settings == 'true'){
			this.features.password_viewer = new PasswordViewer();
		}
	}
	
	activate(){ console.log("4F-FSE Starting");	}
	storeStates(){}
	
	observeEvents():void{
		var document_changes = new MutationObserver((mutations)=>{
			mutations.forEach((mutation) => {
				[].forEach.call(mutation.addedNodes, (node)=> this.decideAction(node));
			});
		}).observe(document.body, {childList: true, subtree:true});
		
		// document.addEventListener('PostsInserted', (evt:any) => {
			
			// if(evt.explicitOriginalTarget.plugins !== undefined){ 
				// this.decideAction(document.getElementById('delform'));
			// }
		// });
	}
	decideAction(node:any):void{
		
		var start:any = node;
		var itterator:any = document.createNodeIterator(start, NodeFilter.SHOW_ELEMENT);
		var node:any;

		for(let feature_key in this.features)
			this.features[feature_key].retrieveStates();
		
		while((node = itterator.nextNode())){
			if(node.tagName !== "BLOCKQUOTE" && node.tagName !== "IMG") continue;
			for(let feature_key in this.features){
				this.features[feature_key].decideAction(node);
			}
		}
	}
}

document.addEventListener('4chanXInitFinished', function(){new Main();});

