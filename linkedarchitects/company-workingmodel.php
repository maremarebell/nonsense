<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<?php include("includes/header-data.php") ;?>
	
<body class="company-workmodel">	
	<!-- Header -->	
	<?php include("includes/header.php") ;?>	
	
	<div id="panorama">		
	
		<div id="main" class="container">		
		
		<!-- Nav -->			
		<?php 				
			$selectedPage="company";				
			include("includes/navigation.php"); 			
		?>					
		
		<!-- Left Column -->			
		<div id="leftcol"></div>	
		
		<!-- Main Column -->			
		<div id="maincol">								
			<div class="slideshow">					
				<div>
					<img class="large" src="images/working-1.png" /> 
					<a class="modelitem-cycle" id="multidisc-cycle" href="#">
					- Multi-disciplinary Practice</a>
				</div>					
				<div>
					<img class="large" src="images/working-2.png" /> 
					<a class="modelitem-cycle" id="pm-cycle" href="#">
					- Efficient Project Management</a>
				</div>					
				<div>
					<img class="large" src="images/working-3.png" /> 
					<a class="modelitem-cycle" id="global-cycle" href="#">
					- Global Network &amp; Resources</a>
				</div>					
				<div>
					<img class="large" src="images/working-4.png" /> 
					<a class="modelitem-cycle" id="colab-cycle" href="#">- Colaborative Working Model</a>
				</div>					
				<div>
					<img class="large" src="images/working-5.png" /> 
					<a class="modelitem-cycle" id="sust-cycle" href="#">
						- Sustainable Products &amp; Services
					</a>
				</div>				
			</div>			
		</div>
		
		<!-- Rght Column -->			
		<div class="col-selected" id="rightcol">				
			<h1>Integrated Expertise.</h1>								
			<div id="workmodel"></div>				
				
			<a class="modelitem" id="multidisc">- Multi-disciplinary Practice</a>				
			<a class="modelitem" id="pm">- Efficient Project Management</a>				
			<a class="modelitem" id="global">- Global Network &amp; Resources</a>				
			<a class="modelitem" id="colab">- Colaborative Working Model</a>				
			<a class="modelitem" id="sust">- Sustainable Products &amp; Services</a>								
				
			<ul class="subnav">					
				<li><a class="unselected" href="company-people.php">- People</a></li>		
				<li><a class="selected" href="company-workingmodel.php">- Working Model</a></li>
			</ul>							
		</div>	
		
		<!-- Right Image -->			
		<img id="rightimg" src="images/right-image.jpg" />	
	
	</div>	
</div>	
	<!-- Footer -->	
	<?php include("includes/footer.php") ;?>	
</body>
</html>