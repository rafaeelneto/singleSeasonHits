<template>
  <footer className={`${styles.tile} ${styles.about}`}>
        <div className={`${styles.tileContent}`}>
          <p className={styles.tileText}>
            Criado e desenvolvido por Rafael Gomes
          </p>
          <div className={styles.socialBtnsContainer}>
            <LinkMaterial
              className={styles.socialBtn}
              component={IconButton}
              onClick={() => {
                // @ts-ignore
                if (window.gtag) {
                  // @ts-ignore
                  window.gtag(
                    'event',
                    'button clicked',
                    'Link to social media',
                    'behance'
                  );
                }
              }}
              href="https://www.behance.net/rafaeelneto"
              target="_blank"
            >
              <Behance />
            </LinkMaterial>
            <LinkMaterial
              className={styles.socialBtn}
              component={IconButton}
              onClick={() => {
                // @ts-ignore
                if (window.gtag) {
                  // @ts-ignore
                  window.gtag(
                    'event',
                    'button clicked',
                    'Link to social media',
                    'linkedinho'
                  );
                }
              }}
              href="https://www.linkedin.com/in/rafaeelneto/"
              target="_blank"
            >
              <Linkedin />
            </LinkMaterial>

            <LinkMaterial
              className={styles.socialBtn}
              component={IconButton}
              onClick={() => {
                // @ts-ignore
                if (window.gtag) {
                  // @ts-ignore
                  window.gtag(
                    'event',
                    'button clicked',
                    'Link to social media',
                    'email'
                  );
                }
              }}
              href="mailto: rafaelneto.g@gmail.com"
              target="_blank"
            >
              <Email />
            </LinkMaterial>
          </div>
        </div>
      </footer>
</template>