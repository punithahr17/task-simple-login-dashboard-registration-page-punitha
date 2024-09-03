document.addEventListener("DOMContentLoaded" ,function(){
    const userTableBody=document.getElementById('userTableBody');
    const largeImage=document.getElementById('largeImage');
    const imageModal=new bootstrap.Modal(document.getElementById('imageModal'));


    let totalPages=0;
    let currentPage=1;
    let userData=[];
    let itemsPerPage=50; 


    function renderPagination(){
        const paginationContainer=document.getElementById('pagination');
        paginationContainer.innerHTML='';


        const prevButton=document.createElement('button');
        prevButton.classList.add('btn','btn-primary', 'me-2');
        prevButton.textContent='Previous';
        prevButton.disabled=currentPage===1;
        prevButton.addEventListener('click',function(){
            if(currentPage > 1){
                currentPage--;
                displayUsers();
            }
        });

        paginationContainer.appendChild(prevButton);

        for(let i=1; i <= totalPages; i++){
            const pageButton=document.createElement('button');
            pageButton.classList.add('btn','btn-secondary', 'me-2');
            pageButton.textContent=i;
            pageButton.style.fontSize='16px';
            if(i===currentPage){
                pageButton.classList.add('active');
            }
            pageButton.addEventListener('click',function(){
                currentPage=i;
                displayUsers();
            });
            paginationContainer.appendChild(pageButton);
        }

        const nextButton=document.createElement('button');
        nextButton.classList.add('btn', 'btn-primary');
        nextButton.textContent='Next';
        nextButton.disabled=currentPage === totalPages;
        nextButton.addEventListener('click',function(){
            if(currentPage < totalPages) {
                currentPage++;
                displayUsers();
            }
        });

        paginationContainer.appendChild(nextButton);

    }

        function displayUsers(){
            userTableBody.innerHTML='';

            const start=(currentPage-1) * itemsPerPage;
            const end=start + itemsPerPage;
            const usersToDisplay= userData.slice(start,end);

            usersToDisplay.forEach((user, index) => {
                const serialNumber=start + index + 1;
                const row=document.createElement('tr');
                row.innerHTML=`
                <td>${serialNumber}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.mobile}</td>
                <td>${user.gender}</td>
                <td>${user.country}</td>
                <td>${user.state}</td>
                <td>${user.city}</td>
                <td>${user.pincode}</td>
                <td><img src="${user.image}" alt="Profile Image" class="img-thumbnail thumbnail-image" style="width:50px; cursor:pointer;"></td>
            `;
            userTableBody.appendChild(row);
            
            row.querySelector('img').addEventListener('click',function(){
                largeImage.src=user.image;
                imageModal.show();
            });
        });

            renderPagination();
        }
        
        function fetchAndDisplayUserData(){
            fetch('json/userData.json')
            .then(response => response.json())
            .then(data => {
                userData=data;
                totalPages = Math.ceil(userData.length / itemsPerPage );
                displayUsers();
            })
            .catch(error => {
                console.error('Error fetching user data:',error);
                userTableBody.innerHTML='<tr><td colspan="11">Failed to load user data.</td></tr>';
            });
        }
        
        
        fetchAndDisplayUserData();
        
        fetch('header.html')
        .then(response => response.text())
        .then(data =>document.getElementById('header').innerHTML=data);
        
        fetch('footer.html')
        .then(response => response.text())
        .then(data =>document.getElementById('footer').innerHTML=data);
});
