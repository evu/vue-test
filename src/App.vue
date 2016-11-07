<template>
	<div id="app">
		<alerts :alerts="alerts"></alerts>
		<createNote></createNote>
		<notes v-on:selected="editNote" v-on:alerted="assignAlert"></notes>
    	<update-modal :note="selectedNote" v-on:done="finishNote"></update-modal>
	</div>
</template>

<script>
	import Notes from './components/notes/Index';
	import Alerts from './components/Alerts';
	import CreateNote from './components/notes/Create';
	import UpdateModal from './components/notes/UpdateModal';

	export default {
		name: 'app',
		components: {
			Notes,
			Alerts,
			CreateNote,
			UpdateModal
		},
		data() {
			return {
				selectedNote: null,
				alerts: []
			}
		},
		methods: {
			editNote(note) {
				this.selectedNote = note;
			},
			finishNote(note) {
				this.selectedNote = null;
			},
			assignAlert(alert) {
				console.log('app recieved')
				this.alerts.push(alert);
				setTimeout(() => {
					this.alerts.splice(alert, 1);
				}, alert.duration || 1500);
			}
		}
	}
</script>

<style>
	*{
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	body{
		background: #eee;
		padding: 0 16px;
	}
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
