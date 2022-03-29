<template>
    <footer>
        <div class="footer-container">
            <div class="footer-list">
                <a href="#" aria-label="mentions">Mentions légales</a>
                <a href="#" aria-label="confidentialité">Politique de confidentialité</a>
                <a href="mailto:webmaster@example.com" aria-label="contact administrateur par email">Contact</a>
            </div>
        </div>
    </footer>
</template>

<script>


export default {
     name: "Footer",
        
    }
</script>

<style>

.footer-container {

    background-color: black;
    padding: 1em;
    
    ;
}

.footer-list  {

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
}
.footer-list a {
    text-decoration: none;
    color:white
}

@media(max-width:412px) {

    .footer-list {

        flex-direction: column;
    }

    .footer-container {

        font-size: large;
    }
}
</style>
