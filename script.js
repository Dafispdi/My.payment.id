const loader = document.getElementById('loader');
        const aboutPage = document.getElementById('about');
        const paymentPage = document.getElementById('payment');
        const qrOverlay = document.getElementById('qrOverlay');
        const zoomedQR = document.getElementById('zoomedQR');
        const qrisImage = document.getElementById('qrisImage');
        const musicPlayer = document.getElementById('background-music'); // Get the audio element

        // --- Initial Page Load ---
        window.addEventListener('load', () => {
            // Ensure aboutPage starts visible & paymentPage hidden if JS enabled
            aboutPage.classList.add('active');
            aboutPage.classList.remove('hidden');
            paymentPage.classList.add('hidden');
            paymentPage.classList.remove('active');

            setTimeout(() => {
                loader.classList.add('hidden');
                // Don't explicitly show 'about' here, it's handled by initial classes
            }, 2000); // Keep loader a bit longer for effect
        });

        // --- Page Transition Functions ---
        function showPayment() {
             switchPage(aboutPage, paymentPage);
            // Play music when switching TO payment
              playMusic();
        }

        function showAbout() {
            switchPage(paymentPage, aboutPage);
             // Optional: Pause music when returning from payment
            // pauseMusic();
        }

        function switchPage(pageToHide, pageToShow) {
            if (pageToHide.classList.contains('active')) {
              pageToHide.classList.remove('active');
              pageToHide.classList.add('hidden');

                // Use transitionend event for smoother page switching
                pageToHide.addEventListener('transitionend', function handler() {
                   pageToHide.removeEventListener('transitionend', handler); // Clean up listener

                    pageToShow.classList.remove('hidden');
                   pageToShow.classList.add('active');

                    // Scroll to top of new page (especially useful for mobile)
                    window.scrollTo(0, 0);
               }, { once: true }); // Ensure the event listener runs only once

             } else {
               // Fallback if the first page wasn't active (e.g., rapid clicking)
               pageToShow.classList.remove('hidden');
               pageToShow.classList.add('active');
               window.scrollTo(0, 0);
            }
        }


        // --- QR Zoom Functionality ---
        function zoomQR() {
             if (!qrOverlay || !zoomedQR || !qrisImage) return; // Safety check
            zoomedQR.src = qrisImage.src;
            qrOverlay.classList.add('active');
        }

        function closeZoom() {
             if (!qrOverlay) return;
            qrOverlay.classList.remove('active');
        }

         // Add Escape key listener to close the zoom overlay
         document.addEventListener('keydown', (event) => {
              if (event.key === 'Escape' && qrOverlay.classList.contains('active')) {
                   closeZoom();
              }
          });

        // --- Music Control Functions ---
        function playMusic() {
             if (musicPlayer) {
                 // Attempt to play. This might be blocked by browser policy initially
                 // Best practice is often to require a user interaction first,
                 // but clicking the "Go to Payment" button IS a user interaction.
                 musicPlayer.play().catch(error => {
                      console.warn("Music autoplay failed:", error);
                     // Optionally, provide a manual play button if autoplay fails
                  });
              }
         }

        function pauseMusic() {
            if (musicPlayer) {
                 musicPlayer.pause();
              }
         }

         // Optional: Attempt to play music after first user interaction anywhere on the page
         /*
          function userInteracted() {
             playMusic();
            // Remove this listener after the first interaction
             document.removeEventListener('click', userInteracted);
             document.removeEventListener('keydown', userInteracted);
          }
          document.addEventListener('click', userInteracted, { once: true });
         document.addEventListener('keydown', userInteracted, { once: true });
        */