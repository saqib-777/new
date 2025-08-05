<div className="flex items-center justify-between pt-4 border-t border-gray-200">
  <span className="text-lg font-bold text-primary-600">
    Rs. {animal.adoptionFee.toLocaleString()}
  </span>
  <Button
    size="sm"
    className="bg-primary-600 hover:bg-primary-700"
    onClick={() => {
      setSelectedAnimal(animal);
      setShowAdoptionModal(true);
    }}
  >
    Adopt Me
  </Button>
</div>
