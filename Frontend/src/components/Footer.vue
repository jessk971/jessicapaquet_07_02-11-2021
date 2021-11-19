<template>
    <footer>
        <div class="footer-container">
            <div class="footer-list">
                <a href="#" aria-label="mentions">Mentions légales</a>
                <a href="#" aria-label="confidentialité">Polique de confidentialité</a>
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
    
    ;
}

.footer-list a {

    text-decoration: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    color: white;
    flex-direction: row;
}
</style>
