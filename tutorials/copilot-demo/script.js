// script.js

document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts');
    
    // Sample data for posts
    const posts = [
        {
            user: 'User1',
            content: 'This is my first post!',
            time: '2 hours ago'
        },
        {
            user: 'User2',
            content: 'Loving the new features!',
            time: '3 hours ago'
        },
        {
            user: 'User3',
            content: 'Check out my latest project!',
            time: '5 hours ago'
        }
    ];

    // Function to load posts
    function loadPosts() {
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <div class="post-user">${post.user}</div>
                <div class="post-content">${post.content}</div>
                <div class="post-time">${post.time}</div>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    // Call loadPosts to display posts on page load
    loadPosts();

    // Like buttons
    const likeButtons = document.querySelectorAll('.like-btn');
    
    if (likeButtons.length > 0) {
        likeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const container = e.target.closest('.post-image-container');
                const rect = container.getBoundingClientRect();
                createHeartFireworks(container, rect.width / 2, rect.height / 2);
                
                // Toggle liked state
                e.target.classList.toggle('liked');
            });
        });
    }

    function createHeartFireworks(container, x, y) {
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.classList.add('burst-heart');
            
            const angle = (Math.PI * 2 * i) / 20;
            const distance = 100 + Math.random() * 50;
            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;
            
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            heart.style.setProperty('--tx', offsetX + 'px');
            heart.style.setProperty('--ty', offsetY + 'px');
            heart.style.animationDelay = `${Math.random() * 0.2}s`;
            
            container.appendChild(heart);
            setTimeout(() => heart.remove(), 1200);
        }
    }

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});