import Firebase from 'firebase';
import EventEmitter from 'events';

// extend EventEmitter so user of NoteRepository can react to our own defined events (ex: noteRepository.on('added'))
class NoteRepository extends EventEmitter {
	constructor () {
		super();

	    // Initialize Firebase
	    Firebase.initializeApp({
	    	apiKey: "AIzaSyDfTZ57RjfnM9cJAyIobpH3ihZgQaHNxYA",
	    	authDomain: "vuefb-233e7.firebaseapp.com",
	    	databaseURL: "https://vuefb-233e7.firebaseio.com",
	    	storageBucket: "vuefb-233e7.appspot.com",
	    	messagingSenderId: "823228193462"
	    });

	    this.ref = Firebase.database().ref('notes');
	    this.attachFirebaseListeners();
	}

	attachFirebaseListeners() {
		this.ref.on('child_added', this.onAdded, this);
		this.ref.on('child_removed', this.onRemoved, this);
		this.ref.on('child_changed', this.onChanged, this);
	}

	onAdded(snapshot) {
		let note = this.snapshotToNote(snapshot);
		this.emit('added', note);
	}

	onRemoved(snapshot) {
		let note = this.snapshotToNote(snapshot);
		this.emit('removed', note);
	}

	onChanged(snapshot) {
		let note = this.snapshotToNote(snapshot);
		this.emit('changed', note);
	}

	snapshotToNote(snapshot) {
		let key = snapshot.key;
		let note = snapshot.val();
		note.key = key;
		return note;
	}

	create({title = '', content = ''}, onComplete) {
		this.ref.push({title, content}, onComplete);
	}

	update({key, title = '', content = ''}, onComplete) {
		this.ref.child(key).update({title, content}, onComplete);
	}

	remove({key}, onComplete) {
		this.ref.child(key).remove(onComplete);
	}

	// Finds the note inside the array by looking for its key
	find (notes, key) {
		return notes.find(note => note.key === key)
	}

}
export default new NoteRepository() // this instance will be shared across imports