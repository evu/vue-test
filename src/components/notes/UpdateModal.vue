<template>
	<transition name="modal">
		<div v-if="note" class="backdrop" v-on:click="dismissModal">
			<form class="edit-note" v-on:submit.prevent="update" v-on:click.stop="">
				<input type="text" name="title" v-model="note.title" placeholder="Title">
				<textarea name="content" v-model="note.content" placeholder="Text goes here..."></textarea>
				<button type="button" v-on:click="remove">Remove</button>
				<button type="submit">Done</button>
			</form>
		</div>
	</transition>
</template>


<script>
	import NoteRepo from '../../data/NoteRepo.js';

	export default {
		props: ['note'],
		methods: {
			remove() {
				NoteRepo.remove(this.note, (err) => {
					if (err) {
						return  this.$emit('alert', {
							type: 'error', 
							message: 'Failed to remove note'
						});
					}

        			this.dismissModal();
				});
			},
			update() {
				NoteRepo.update(this.note, (err) => {
					if (err) {
						return this.$emit('alert', {
							type: 'error', 
							message: 'Failed to update note'
						});
        			}

					this.dismissModal();

			        this.$emit('alert', {
			        	type: 'success', 
			        	message: 'Note was successfully updated'
			        });
			    })
			},
			dismissModal() {
				this.$emit('done');
			}
		}
	}
</script>

<style>
	.backdrop{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: rgba(50,50,50,0.8);
	}
	form.edit-note{
		position: relative;
		width: 480px;
		max-width: 100%;
		margin: 25vh auto 0;
		background: #fff;
		padding: 15px;
		border-radius: 2px;
		box-shadow: 0 1px 50px #555;
	}
	form.edit-note input, form.edit-note textarea{
		width: 100%;
		max-width: 100%;
		border: none;
		padding: 4px;
		outline: none;
		font-size: 1.2em;
	}
	form.edit-note button[type=submit]{
		font-size: 18px;
		float: right;
		background: #41b883;
		color: #fff;
		border: none;
		border-radius: 3px;
		opacity: 1;
		cursor: pointer;
		padding: 4px 6px;
		margin: 0;
	}
	form.edit-note button{
		background: none;
		border: none;
		font-size: 20px;
		opacity: 0.6;
		cursor: pointer;
		transition: opacity .5s;
		margin: 0 4px 0 0;
	}
	form.edit-note button:hover, form.edit-note button:focus{
		opacity: 1;
	}

	/* modal transition */
	.modal-enter-active, .modal-leave-active{
		transition: opacity .3s ease;
		opacity: 1;
	}
	.modal-enter-active form, .modal-leave-active form{
		transition: transform .3s ease;
	}
	.modal-enter-active, .modal-leave-active {
		opacity: 0;
	}

	.modal-enter-active form,
	.modal-leave-active form {
		-webkit-transform: scale(1.1);
		transform: scale(1.1);
	}
</style>