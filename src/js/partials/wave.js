const SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;

let container;
let camera, scene, renderer;

let particles, count = 0;

let mouseX = 200, mouseY = -400;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {

	container = document.createElement( 'div' );
	container.classList.add('wave-container');
	document.querySelector('.first-screen').appendChild( container );

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1000;

	scene = new THREE.Scene();

	//

	const numParticles = AMOUNTX * AMOUNTY;

	const positions = new Float32Array( numParticles * 3 );
	const scales = new Float32Array( numParticles );

	let i = 0, j = 0;

	for ( let ix = 0; ix < AMOUNTX; ix ++ ) {

		for ( let iy = 0; iy < AMOUNTY; iy ++ ) {

			positions[ i ] = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 ); // x
			positions[ i + 1 ] = 0; // y
			positions[ i + 2 ] = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 ); // z

			scales[ j ] = 1;

			i += 3;
			j ++;

		}

	}

	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
	geometry.setAttribute( 'scale', new THREE.BufferAttribute( scales, 1 ) );

	const material = new THREE.ShaderMaterial( {

		uniforms: {
			color: { value: new THREE.Color( 0x0a00ff ) },
		},
		vertexShader: document.getElementById( 'vertexshader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentshader' ).textContent

	} );

	//

	particles = new THREE.Points( geometry, material );
	scene.add( particles );

	//

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( 0xffffff, 0);
	container.appendChild( renderer.domElement );

	container.style.touchAction = 'none';
	container.addEventListener( 'pointermove', onPointerMove );

	//

	window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	container.addEventListener( 'pointermove', onPointerMove );

}

//

function onPointerMove( event ) {
	if (window.matchMedia("(min-width: 1280px)").matches) {
		if ( event.isPrimary === false ) return;
		mouseX = event.clientX - windowHalfX;
	}
}

//

function animate() {

	requestAnimationFrame( animate );

	render();
}

function render(time) {
	time *= 0.001;

	const canvas = renderer.domElement;
	camera.aspect = canvas.clientWidth / canvas.clientHeight;
	camera.updateProjectionMatrix();

	if (resizeRendererToDisplaySize(renderer)) {
		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	}

	camera.position.x += ( mouseX - camera.position.x ) * .05;
	camera.position.y += ( - mouseY - camera.position.y ) * .05;
	camera.lookAt( scene.position );

	const positions = particles.geometry.attributes.position.array;
	const scales = particles.geometry.attributes.scale.array;

	let i = 0, j = 0;

	for ( let ix = 0; ix < AMOUNTX; ix ++ ) {

		for ( let iy = 0; iy < AMOUNTY; iy ++ ) {

			positions[ i + 1 ] = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
				( Math.sin( ( iy + count ) * 0.5 ) * 50 );

			scales[ j ] = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 20 +
				( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 20;

			i += 3;
			j ++;

		}

	}

	particles.geometry.attributes.position.needsUpdate = true;
	particles.geometry.attributes.scale.needsUpdate = true;

	renderer.render( scene, camera );

	count += 0.1;

}

function resizeRendererToDisplaySize(renderer) {
	const canvas = renderer.domElement;
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	const needResize = canvas.width !== width || canvas.height !== height;
	if (needResize) {
		renderer.setSize(width, height, false);
	}
	return needResize;
}