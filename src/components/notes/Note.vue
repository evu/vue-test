<template>
	<div class="note">
		<h1>{{ note.title }}<h1>
		<pre>{{ note.content }}</pre>
		<button type="button" v-on:click.stop="remove">Remove</button>
		<button class="edit" type="button" v-on:click="selectNote(note)">Edit</button>
	</div>
</template>

<script>
	import NoteRepo from '../../data/NoteRepo';

	export default {
		props: ['note'],
		methods: {
			remove(){
				NoteRepo.remove(this.note, (err) => {
					if (err) {
						self.$emit('alerted', {
							type: 'error', 
							message: 'Failed to remove note'
						});
					}
				})
			},
			selectNote({key, title, content}) {
				this.$emit('selected', {key, title, content});
			}
		}
	}
</script>

<style>
	.note {
		background: #fff;
		border-radius: 2px;
		box-shadow: 0 2px 5px #ccc;
		padding: 10px;
		width: 240px;
		margin: 16px;
		float: left;
	}
	.note h1 {
		font-size: 1.1em;
		margin-bottom: 6px;
	}
	.note pre {
		font-size: 1.1em;
		margin-bottom: 10px;
		white-space: pre-wrap; 
		word-wrap: break-word;
		font-family: inherit;
	}
	.note button{
		background: none;
		border: none;
		float: left;
		font-size: 12px;
		opacity: 0;
		cursor: pointer;
		transition: opacity .5s;
		margin: 0 4px 0 0;
	}
	.note button.edit{
		float: right;
	}
	.note:hover, .note:focus{
		box-shadow: 0 2px 10px #999;
	}
	.note:hover button, .note:focus button{
		opacity: 0.6;
	}
	.note button:hover, .note button:focus{
		opacity: 1;
	}
</style>