<template>

	<div class="notes" ref="notes">
		<note v-for="note in notes" :note="note" v-on:selected="emitNote(note)" v-on:alerted="emitAlert"></note >
	</div>

</template>


<script>


import Note from './Note';
import NoteRepo from '../../data/NoteRepo';

export default {
	components: {
		Note
	},
	data() {
		return {
			notes: []
		}
	},
	mounted() {
		NoteRepo.on('added', (note) => {
			this.notes.unshift(note);
		});

		NoteRepo.on('changed', ({key, title, content}) => {
			let outdatedNote = NoteRepo.find(this.notes, key) // get specific note from the notes in our VM by key
			outdatedNote.title = title
			outdatedNote.content = content
		});

		NoteRepo.on('removed', ({key}) => {
			let noteToRemove = NoteRepo.find(this.notes, key) // get specific note from the notes in our VM by key
			this.notes.splice(noteToRemove, 1) // remove note from notes array
		})
	},
	methods: {
		emitNote({key, title, content}) {
			this.$emit('selected', {key, title, content});
		},
		emitAlert(alert) {
			console.log('recieved')
			this.$emit('alerted', alert);
		}
	}
}
</script>

<style>
  .notes{
    padding: 0 100px;
  }
</style>