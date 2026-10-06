<form action="/contact" class="fs-form" target="_top" method="POST">
	<div class="fs-field">
		<label class="fs-label" for="name">Your Name</label>
		<input class="fs-input" id="name" name="name" required />
	</div>
	<div class="fs-field">
		<label class="fs-label" for="email">Email</label>
		<input class="fs-input" id="email" name="email" required />
		<p class="fs-description">This will help me respond to your query via an email.</p>
	</div>
	<div class="fs-field">
		<label class="fs-label" for="message">Message</label>
		<textarea class="fs-textarea" id="message" name="message" required></textarea>
		<p class="fs-description">What would you like to discuss?</p>
	</div>
	<div class="fs-button-group">
		<button class="btn btn-primary" type="submit">Submit</button>
	</div>
</form>

<style>
	.fs-form {
		display: grid;
		gap: 3rem;
		align-items: center;
		max-width: 800px;
		margin: 0 auto;
		background-color: var(--card-bg);
    border-radius: 35px;
	}
	.fs-field {
		display: flex;
		flex-direction: column;
		gap: 1rem;
    margin-left: 1rem;
    margin-top: 1rem;
	}
	.fs-label {
	}
	.fs-input {
	}
	.fs-description {
	}
	.fs-textarea {
	}
	.fs-button-group {
    display: flex;
        flex-direction: column;
        gap: 1rem;
	}

	/* Buttons */
	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.8rem 1.5rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 500;
		transition: all 0.3s ease;
		cursor: pointer;
		border: none;
		font-size: 1rem;
		justify-content: center;
		white-space: nowrap;
	}

	.btn-primary {
		background: linear-gradient(135deg, var(--accent-color), var(--accent-hover));
		color: white;
		box-shadow: 0 4px 15px rgba(77, 166, 217, 0.3);
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(77, 166, 217, 0.4);
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.hero-content {
			grid-template-columns: 1fr;
			text-align: center;
			gap: 2rem;
		}

		.hero-text h1 {
			font-size: 2.5rem;
		}

		.profile-image {
			width: 200px;
			height: 200px;
		}

		.about-content {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.stats {
			justify-content: center;
		}

		.services-grid {
			grid-template-columns: 1fr;
		}

		.contact-content {
			grid-template-columns: 1fr;
			text-align: center;
		}

		.contact-actions {
			align-items: center;
		}

		.btn {
			width: 200px;
		}

		.section-container {
			padding: 2rem 1rem;
		}

		.section-title {
			font-size: 2rem;
		}
	}

	@media (max-width: 480px) {
		.hero-text h1 {
			font-size: 2rem;
		}

		.rotating-skills {
			font-size: 1.2rem;
		}

		.skill-text {
			min-width: 150px;
		}

		.hero-actions {
			flex-direction: column;
			align-items: center;
		}

		.stats {
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>
